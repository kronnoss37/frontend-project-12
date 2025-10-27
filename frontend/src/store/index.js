import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import channelsReducer from './slices/channelsSlice'
import messagesReducer from './slices/messagesSlice'
import notificationsReducer from './slices/notificationsSlice'


export default configureStore({
  reducer: {
    authData: authReducer,
    channelsData: channelsReducer,
    messagesData: messagesReducer,
    notifications: notificationsReducer,
  },
});
