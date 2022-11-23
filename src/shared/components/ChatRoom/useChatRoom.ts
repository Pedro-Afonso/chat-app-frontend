import { useEffect, useCallback, useRef } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'

import { useSocket } from '../../hooks/useSocket'
import { TMessage } from '../../interface'
import { getAllMessages, receivedMessage } from '../../slices/messageSlice'
import {
  addNotification,
  removeNotification
} from '../../slices/notificationSlice'

export const useChatRoom = () => {
  const chat = useAppSelector(state => state.chat.chat)
  const authUser = useAppSelector(state => state.user.auth)
  const prevChat = useRef('')

  const dispatch = useAppDispatch()

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

  const contact = chat?.users.filter(
    contact => contact._id !== authUser?._id
  )[0]

  useEffect(() => {
    if (!chat) return
    if (prevChat.current === chat._id) return

    socket.emit('join chat', { chatId: chat._id, leave: prevChat.current })

    dispatch(removeNotification({ chatId: chat._id }))

    prevChat.current = chat._id
  }, [chat, dispatch, socket])

  return {
    chat,
    contact
  }
}
