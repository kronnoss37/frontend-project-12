import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import routes from '../routes'

const getErrorByStatus = (status) => {
  switch (status) {
    case 401: {
      return { type: 'auth', pathMessage: '' }
    }
    case 500: {
      return { type: 'server', pathMessage: '' }
    }
    case 501: {
      return { type: 'server', pathMessage: '' }
    }
    default: {
      return null
    }
  }
}

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
      const errorData = getErrorByStatus(error.response?.status)
      if (!errorData) console.error(`Error: ${error.message}`)
      return rejectWithValue(errorData)
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
      .addCase(authUser.pending, (state) => {
        state.error = null
      })
      .addCase(authUser.fulfilled, (state, action) => {
        console.log('fulfilled')
        const user = action.payload
        state.user = user
        state.isAuth = true
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
