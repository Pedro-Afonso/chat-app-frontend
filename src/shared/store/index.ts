import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from '../slices/userSlice'
import { chatReducer } from '../slices/chatSlice'
import { messageReducer } from '../slices/messageSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    message: messageReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
