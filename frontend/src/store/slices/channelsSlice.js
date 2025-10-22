import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import routes from "../../routes";

const getRequestBody = (token) => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

const getChannels = createAsyncThunk(
  'channels/getChannels',
  async (token) => {
    try{
      const response = await axios.get(routes.channelsPath(), getRequestBody(token));
      return response.data
    } catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`);
    }
  }
)

const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ token, newChannel }) => {
    try{
      const response = await axios.post(routes.channelsPath(), newChannel, getRequestBody(token));
      console.log('response', response);
      return response.data
    } catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`);
    }
  }
)

const editChannel = createAsyncThunk(
  'channels/editChannel',
  async ({ token, id, editedChannel }) => {
    try{
      const response = await axios.patch(routes.channelsPath(id), editedChannel, getRequestBody(token));
      console.log('response', response);
      return response.data
    } catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`);
    }
  }
)

const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ token, id }) => {
    try{
      const response = await axios.delete(routes.channelsPath(id), getRequestBody(token));
      console.log('response', response);
      return response.data
    } catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`);
    }
  }
)

const initialState = {
  channels: [],
  currentChannel: null
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      const newChannel = action.payload
      state.currentChannel = newChannel
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.fulfilled, (state, action) => {
        const channels = action.payload;
        state.channels = channels;
        state.currentChannel = channels?.[0]
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        const newChannel = action.payload;
        state.channels.push(newChannel);
        state.currentChannel = newChannel;
      })
      .addCase(editChannel.fulfilled, (state, action) => {
        const newChannel = action.payload;
        const restChannels = state.channels.filter(({ id }) => id !== newChannel.id);
        state.channels = [...restChannels, newChannel];
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        const { id } = action.payload;
        const restChannels = state.channels.filter((channel) => channel.id !== id);
        state.channels = restChannels;
      })
      // .addMatcher(
      //   (action) => action.type.endsWith('/rejected'), // && action.type.startsWith(''), нужно ли состояние ошибки?
      //   (state, action) => {
      //     console.log('rejected channel', action);
      //     const errorData = action.payload;
      //     state.channels = null;
      //     state.error = errorData;
      //   }
      // );
  }
})

export { getChannels };
export const { setCurrentChannel } = channelsSlice.actions
export default channelsSlice.reducer