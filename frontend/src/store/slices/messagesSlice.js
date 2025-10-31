import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import routes from '../../routes'
import handleErrors from '../../utils/handleErrors'
import { removeChannel } from './channelsSlice'

const getRequestBody = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (token, {rejectWithValue}) => {
    try {
      const response = await axios.get(routes.messagesPath(), getRequestBody(token))
      return { data: response.data };
    }
    catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
      return rejectWithValue(handleErrors(error));
    }
  },
)

const addAsyncMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ token, newMessage }, {rejectWithValue}) => {
    try {
      await axios.post(routes.messagesPath(), newMessage, getRequestBody(token))
    }
    catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
      return rejectWithValue(handleErrors(error));
    }
  },
)

const initialState = {
  messages: [],
  isLoadingMessage: false,
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const newMessage = action.payload
      state.isLoadingMessage = false
      state.messages.push(newMessage)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.fulfilled, (state, action) => {
        const { data: messages } = action.payload
        state.messages = messages
      })
    builder
      .addCase(addAsyncMessage.pending, (state) => {
        state.isLoadingMessage = true
      })
      .addCase(addAsyncMessage.rejected, (state) => {
        state.isLoadingMessage = false
      })

    builder
      .addCase(removeChannel, (state, action) => {
        const channelId = action.payload.id
        const restMessages = state.messages.filter(message => message.channelId !== channelId)
        state.messages = restMessages
      })
  },
})

export { getMessages, addAsyncMessage }

export const { addMessage } = messagesSlice.actions
export default messagesSlice.reducer
