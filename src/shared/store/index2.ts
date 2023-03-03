/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { userReducer } from '../slices/userSlice'
import { chatReducer } from '../slices/chatSlice'
import { messageReducer } from '../slices/messageSlice'
import { notificationReducer } from '../slices/notificationSlice'
import { portalReducer } from '../slices/potalSlice'

import { userApiSlice } from '../services/userService'
import { chatApiSlice } from '../services/chatService'
import { messageApiSlice } from '../services/messageService'

export const store2 = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    chat: chatReducer,
    message: messageReducer,
    portal: portalReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [chatApiSlice.reducerPath]: chatApiSlice.reducer,
    [messageApiSlice.reducerPath]: messageApiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      userApiSlice.middleware,
      chatApiSlice.middleware,
      messageApiSlice.middleware
    ])
})

type RootState = ReturnType<typeof store2.getState>
type AppDispatch = typeof store2.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
