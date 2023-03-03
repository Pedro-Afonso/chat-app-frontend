import { reset as resetUserSlice } from '../slices/userSlice'
import { reset as resetChatSlice } from '../slices/chatSlice'
import { reset as resetMessageSlice } from '../slices/messageSlice'
import { reset as resetNotificationSlice } from '../slices/notificationSlice'
import { useAppDispatch } from './useAppDispatch'
import { chatApiSlice, messageApiSlice, userApiSlice } from '../services'
export const useLogout = () => {
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(resetChatSlice())
    dispatch(resetMessageSlice())
    dispatch(resetNotificationSlice())
    dispatch(userApiSlice.util.resetApiState())
    dispatch(messageApiSlice.util.resetApiState())
    dispatch(chatApiSlice.util.resetApiState())
    dispatch(resetUserSlice())
  }

  return { logout }
}
