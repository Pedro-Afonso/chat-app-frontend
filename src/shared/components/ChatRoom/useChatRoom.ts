import { useEffect, useRef } from 'react'

import { useAppSelector } from '../../hooks'

import { useSocket } from '../../hooks/useSocket'

export const useChatRoom = () => {
  const chat = useAppSelector(state => state.chat.chat)
  const authUser = useAppSelector(state => state.user.auth)
  const prevChat = useRef('')

  const socket = useSocket()

  const contact = chat?.users.filter(
    contact => contact._id !== authUser?._id
  )[0]

  useEffect(() => {
    if (!chat) return
    if (prevChat.current === chat._id) return

    socket.emit('join chat', { chatId: chat._id, leave: prevChat.current })
    prevChat.current = chat._id
  }, [chat, socket])

  return {
    chat,
    contact
  }
}
