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
      return response.data
    }
    catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
    }
  },
)

const addAsyncMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ token, newMessage }) => {
    // { dispatch??? -> dispatch(addMessages(response.data))}
    try {
      const response = await axios.post(routes.messagesPath(), newMessage, getRequestBody(token));
      return response.data;
    } catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`);
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

const addMessageProcess = (state, newMessage) => {
  state.isLoadingMessage = false;
  state.messages.push(newMessage);
}

const initialState = {
  messages: [],
  isLoadingMessage: false,
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      addMessageProcess(state, action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.fulfilled, (state, action) => {
        const messages = action.payload;
        state.messages = messages;
      })
    builder
      .addCase(addAsyncMessage.pending, (state) => {
        state.isLoadingMessage = true;
      })
      .addCase(addAsyncMessage.fulfilled, (state, action) => {
        addMessageProcess(state, action.payload);
      });
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
});

export { getMessages, addAsyncMessage };

export const { addMessage } = messagesSlice.actions
export default messagesSlice.reducer
