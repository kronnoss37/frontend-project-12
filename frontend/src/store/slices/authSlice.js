import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import routes from '../../routes'
import handleErrors from '../../utils/handleErrors'

export const authUser = createAsyncThunk(
  'auth/authUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.loginPath(), user)
      const userData = response.data
      localStorage.setItem('user', JSON.stringify(userData))
      return { data: userData, notificationPath: 'notifications.success.auth' };
    }
    catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
      return rejectWithValue(handleErrors(error))
    }
  },
)

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.signupPath(), user)
      const userData = response.data
      localStorage.setItem('user', JSON.stringify(userData))
      return { data: userData, notificationPath: 'notifications.success.registration' };
    } catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
      return rejectWithValue(handleErrors(error))
    }
  }
)

const processLogOut = (state) => {
  state.user = null
  state.isAuth = false
}

const userData = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: userData ?? null,
  isAuth: !!userData,
  errorType: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => processLogOut(state),
    changeErrorType: (state, action) => {
      state.errorType = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/fulfilled'),
        (state, action) => {
          const { data } = action.payload;
          state.user = data;
          state.isAuth = true;
          state.errorType = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state, action) => {
          if (!action.payload) return;
          const { type } = action.payload;
          processLogOut(state);
          state.errorType = type;
        }
      );
  }
})

export const { logOut, changeErrorType } = authSlice.actions;
export default authSlice.reducer
