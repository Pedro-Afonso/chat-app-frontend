import { useAppSelector } from '../../../../hooks'
import { useGetAllMessagesQuery } from '../../../../services'

export const useChatMessages = () => {
  const userAuth = useAppSelector(state => state.user.auth)

  const messages = useAppSelector(state => state.message.chatMessages)

  const { chat } = useAppSelector(state => state.chat)

  useGetAllMessagesQuery(
    { chatId: chat?._id },
    { refetchOnMountOrArgChange: true }
  )

  return {
    userAuth,
    messages
  }
}
