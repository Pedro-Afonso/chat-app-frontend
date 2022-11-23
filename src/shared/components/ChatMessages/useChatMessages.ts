import { useAppSelector } from '../../hooks'

export const useChatMessages = () => {
  const userAuth = useAppSelector(state => state.user.auth)

  const messages = useAppSelector(state => state.message.chatMessages)

  return {
    userAuth,
    messages
  }
}
