import { useEffect } from 'react'

import { useAppSelector } from '../../hooks'

import { useSocket } from '../../hooks/useSocket'

export const useChatRoom = () => {
  const chat = useAppSelector(state => state.chat.chat)
  const authUser = useAppSelector(state => state.user.auth)

  const socket = useSocket()

  const contact = chat?.users.filter(
    contact => contact._id !== authUser?._id
  )[0]

  useEffect(() => {
    if (chat) {
      socket.emit('join chat', chat._id)
    }
  }, [chat, socket])
  return {
    chat,
    contact
  }
}
