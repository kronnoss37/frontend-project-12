import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import routes from '../../routes'

export const authUser = createAsyncThunk(
  'auth/authUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.loginPath(), user)
      const userData = response.data
      localStorage.setItem('user', JSON.stringify(userData))
      return userData
    }
    catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue({ type: 'auth', pathMessage: '' });
      }
      if (error?.code === 'ERR_NETWORK') {
        return rejectWithValue({ type: 'network', pathMessage: '' });
      }
      console.log(`Error: ${error?.response?.statusText ?? error.message}`);
      return rejectWithValue(null)
    }
  },
)

const processLogOut = (state) => {
  state.user = null
  state.isAuth = false
}

const userData = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: userData ?? null,
  isAuth: !!userData,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => processLogOut(state),
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.fulfilled, (state, action) => {
        const user = action.payload
        state.user = user
        state.isAuth = true
        state.error = null;
      })
      .addCase(authUser.rejected, (state, action) => {
        const errorData = action.payload
        processLogOut(state)
        state.error = errorData
      })
  },
})

export const { logOut } = authSlice.actions
export default authSlice.reducer
