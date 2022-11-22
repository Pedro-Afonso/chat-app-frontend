import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { removeChat } from '../../slices/chatSlice'
import { useSocket } from '../../hooks/useSocket'

export const useChatRoom = () => {
  const chat = useAppSelector(state => state.chat.chat)
  const authUser = useAppSelector(state => state.user.auth)

  const dispatch = useAppDispatch()

  const socket = useSocket()

  const contact = chat?.users.filter(
    contact => contact._id !== authUser?._id
  )[0]

  const handleRemoveChat = () => {
    dispatch(removeChat())
  }

  useEffect(() => {
    if (chat) {
      socket.emit('join chat', chat._id)
    }
  }, [chat, socket])
  return {
    chat,
    contact,
    handleRemoveChat
  }
}
