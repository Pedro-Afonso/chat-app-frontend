import { useEffect, useCallback } from 'react'

import { getAllMessages, receivedMessage } from '../../slices/messageSlice'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { useSocket } from '../../hooks/useSocket'
import { TMessage } from '../../interface'
import { addNotification } from '../../slices/notificationSlice'

export const useChatMessages = () => {
  const dispatch = useAppDispatch()
  const userAuth = useAppSelector(state => state.user.auth)
  const chat = useAppSelector(state => state.chat.chat)
  const messages = useAppSelector(state => state.message.chatMessages)

  const socket = useSocket()

  const handleMessageReceived = useCallback(
    (newMessage: TMessage) => {
      if (!newMessage) return
      if (chat?._id === newMessage.chat._id) {
        dispatch(receivedMessage(newMessage))
      } else {
        dispatch(addNotification(newMessage))
      }
    },
    [dispatch, chat]
  )

  useEffect(() => {
    if (chat) {
      dispatch(getAllMessages(chat._id))
    }
  }, [dispatch, chat])

  useEffect(() => {
    socket.on('message received', handleMessageReceived)

    return () => {
      socket.off('message received', handleMessageReceived)
    }
  }, [socket, handleMessageReceived])

  return {
    userAuth,
    messages
  }
}
