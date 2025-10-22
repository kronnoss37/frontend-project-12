import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import routes from '../../routes'

const getRequestBody = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (token) => {
    try {
      const response = await axios.get(routes.messagesPath(), getRequestBody(token))
      console.log('response', response)
      // check response.ok
      return response.data
    }
    catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
    }
  },
)

const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ token, newMessage }) => {
    try {
      const response = await axios.post(routes.messagesPath(), newMessage, getRequestBody(token))
      console.log('response', response)
      return response.data
    }
    catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
    }
  },
)

// const editMessage = createAsyncThunk(
//   'messages/editMessage',
//   async ({ token, id, editedMessage }, { rejectWithValue }) => {
//     try{
//       const response = await axios.patch(routes.messagesPath(id), editedMessage, getRequestBody(token));
//       console.log('response', response);
//       return response.data
//     } catch (error) {
//       console.error(`Error: ${error.message}`);
//     }
//   }
// )

// const removeMessage = createAsyncThunk(
//   'channels/removeMessage',
//   async ({ token, id }, { rejectWithValue }) => {
//     try{
//       const response = await axios.delete(routes.messagesPath(id), getRequestBody(token));
//       console.log('response', response);
//       return response.data
//     } catch (error) {
//       console.error(`Error: ${error.message}`);
//     }
//   }
// )

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.fulfilled, (state, action) => {
        const messages = action.payload
        state.messages = messages
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        const newMessage = action.payload
        state.messages.push(newMessage)
      })
    // .addCase(editMessage.fulfilled, (state, action) => {
    //   const newMessage = action.payload;
    //   const restMessages = state.messages.filter(({ id }) => id !== newMessage.id);
    //   state.messages = [...restMessages, newMessage];
    // })
    // .addCase(removeMessage.fulfilled, (state, action) => {
    //   const { id } = action.payload;
    //   const restMessages = state.messages.filter((message) => message.id !== id);
    //   state.messages = restMessages;
    // })
    // .addMatcher(
    //   (action) => action.type.endsWith('/rejected'), // && action.type.startsWith(''), нужно ли состояние ошибки?
    //   (state, action) => {
    //     console.log(action);
    //     const errorData = action.payload;
    //     state.messages = null;
    //     state.error = errorData;
    //   }
    // );
  },
})

export { getMessages }
export default messagesSlice.reducer
