import { useAppDispatch, useAppSelector } from '../../hooks'
import { accessChat, selectChat } from '../../slices/chatSlice'

export const useChatList = () => {
  const dispatch = useAppDispatch()
  const chat = useAppSelector(state => state.chat.chat)
  const chatList = useAppSelector(state => state.chat.chats)

  const handleAccessChat = (userId: string) => {
    dispatch(accessChat({ userId }))
  }

  const handleAccessGroupChat = (chatId: string) => {
    dispatch(selectChat(chatId))
  }

  return {
    chat,
    chatList,
    handleAccessChat,
    handleAccessGroupChat
  }
}
