import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TMessage } from '../interface'

export interface INotification {
  chatId: string
  messageId: string
  name: string
}

interface INotificationState {
  notifications: INotification[]
}

const initialState: INotificationState = {
  notifications: []
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: () => initialState,
    addNotification: (state, action: PayloadAction<TMessage>) => {
      if (
        state.notifications
          .map(({ chatId }) => chatId)
          .includes(action.payload.chat._id)
      )
        return
      const data = {
        messageId: action.payload._id,
        chatId: action.payload.chat._id
      } as INotification
      if (action.payload.chat.isGroupChat) {
        data.name = action.payload.chat.name
      } else {
        data.name = action.payload.sender.name
      }

      state.notifications.unshift(data)
    },
    removeNotification: (state, action: PayloadAction<{ chatId: string }>) => {
      state.notifications = state.notifications.filter(
        not => not.chatId !== action.payload.chatId
      )
    },
    loadNotifications: (state, action: PayloadAction<INotification[]>) => {
      state.notifications = action.payload
    }
  }
})

export const { reset, addNotification, removeNotification, loadNotifications } =
  notificationSlice.actions
export const { reducer: notificationReducer } = notificationSlice
