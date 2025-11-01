import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import routes from '../../utils/routes'
import handleErrors from '../../utils/handleErrors'

const getRequestBody = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.channelsPath(), getRequestBody(token))
      return { data: response.data }
    }
    catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
      return rejectWithValue(handleErrors(error))
    }
  },
)

const addAsyncChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ token, newChannel }, { rejectWithValue }) => {
    try {
      await axios.post(routes.channelsPath(), newChannel, getRequestBody(token))
      return { notificationPath: 'notifications.success.addChannel' }
    }
    catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
      return rejectWithValue({ ...handleErrors(error), eventPath: 'notifications.errors.addChannel' })
    }
  },
)

const editAsyncChannel = createAsyncThunk(
  'channels/editChannel',
  async ({ token, id, editedChannel }, { rejectWithValue }) => {
    try {
      await axios.patch(routes.channelsPath(id), editedChannel, getRequestBody(token))
      return { notificationPath: 'notifications.success.renameChannel' }
    }
    catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
      return rejectWithValue({ ...handleErrors(error), eventPath: 'notifications.errors.renameChannel' })
    }
  },
)

const removeAsyncChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ token, id }, { rejectWithValue }) => {
    try {
      await axios.delete(routes.channelsPath(id), getRequestBody(token))
      return { notificationPath: 'notifications.success.removeChannel' }
    }
    catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
      return rejectWithValue({ ...handleErrors(error), eventPath: 'notifications.errors.removeChannel' })
    }
  },
)

const initialState = {
  channels: [],
  currentChannel: null,
  modal: {
    type: null,
    selectedChannel: null,
  },
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const newChannel = action.payload
      state.channels.push(newChannel)
      state.currentChannel = newChannel
    },
    editChannel: (state, action) => {
      const newChannel = action.payload
      const index = state.channels.findIndex(({ id }) => id === newChannel.id)
      state.channels[index] = newChannel
      state.currentChannel = state.currentChannel?.id === newChannel.id ? newChannel : state.currentChannel
    },
    removeChannel: (state, action) => {
      const { id } = action.payload
      const restChannels = state.channels.filter(channel => channel.id !== id)
      state.channels = restChannels
      state.currentChannel = state.currentChannel?.id === id ? state.channels[0] : state.currentChannel
    },
    setCurrentChannel: (state, action) => {
      const newChannel = action.payload
      state.currentChannel = newChannel
    },

    openModal: (state, action) => {
      state.modal = { ...state.modal, ...action.payload }
    },
    closeModal: (state) => {
      state.modal = { type: null, selectedChannel: null }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.fulfilled, (state, action) => {
        const { data: channels } = action.payload
        state.channels = channels
        state.currentChannel = channels?.[0]
      })
  },
})

export { getChannels, addAsyncChannel, editAsyncChannel, removeAsyncChannel }

export const { setCurrentChannel, addChannel, editChannel, removeChannel, openModal, closeModal } = channelsSlice.actions
export default channelsSlice.reducer
