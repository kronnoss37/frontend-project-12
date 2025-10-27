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
      return { data: userData, notificationPath: 'authUser' }
    }
    catch (error) {
      console.error(`Error: ${error?.response?.statusText ?? error.message}`)
      if (error.response?.status === 401) {
        return rejectWithValue({ type: 'auth' })
      }
      return rejectWithValue(handleErrors(error))
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
  errorType: null,
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
        const { data } = action.payload
        state.user = data
        state.isAuth = true
        state.errorType = null
      })
      .addCase(authUser.rejected, (state, action) => {
        if (!action.payload) return
        const { type } = action.payload
        processLogOut(state)
        state.errorType = type
      })
  },
})

export const { logOut } = authSlice.actions
export default authSlice.reducer
