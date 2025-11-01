import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: {
    type: null, // error | success | null
    path: '',
    eventTitlePath: '',
  },
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        action => action.type.endsWith('/pending'),
        (state) => {
          state.notification.type = null
          state.notification.path = ''
          state.notification.eventTitlePath = ''
        },
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        (state, action) => {
          const data = action.payload
          if (data?.notificationPath) {
            state.notification.type = 'success'
            state.notification.path = data.notificationPath
          }
        },
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          const data = action.payload
          if (data?.notificationPath) {
            state.notification.type = 'error'
            state.notification.path = data.notificationPath
          }
          if (data?.eventPath) {
            state.notification.type = 'error'
            state.notification.eventTitlePath = data.eventPath
          }
        },
      )
  },
})

export default notificationsSlice.reducer
