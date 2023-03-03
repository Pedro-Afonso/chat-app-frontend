import { useEffect, useCallback, useRef } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'

import { useSocket } from '../../hooks/useSocket'
import { TMessage } from '../../interface'
import { useAccessChatMutation } from '../../services'
import { receivedMessage } from '../../slices/messageSlice'
import {
  addNotification,
  removeNotification
} from '../../slices/notificationSlice'
import { EVENTS } from '../../utils/constants'

export const useChatRoom = () => {
  const chat = useAppSelector(state => state.chat.chat)

  /* const [, { data }] = useAccessChatMutation({
    fixedCacheKey: 'chat-room'
  }) */

  /* const chat = data?.chat */

  const authUser = useAppSelector(state => state.user.auth)

  // const prevChat = useRef('')

  // const dispatch = useAppDispatch()

  // const [getAllMessages] = useLazyGetAllMessagesQuery()

  const socket = useSocket()

  // const handleMessageReceived = useCallback(
  //   (newMessage: TMessage) => {
  //     if (!newMessage) return
  //     if (chat?._id === newMessage.chat._id) {
  //       dispatch(receivedMessage(newMessage))
  //     } else {
  //       dispatch(addNotification(newMessage))
  //     }
  //   },
  //   [dispatch, chat]
  // )

  // useEffect(() => {
  //   if (chat) {
  //     getAllMessages({ chatId: chat._id })
  //   }
  // }, [getAllMessages, chat])

  // useEffect(() => {
  //   socket.on('message received', handleMessageReceived)

  //   return () => {
  //     socket.off('message received', handleMessageReceived)
  //   }
  // }, [socket, handleMessageReceived])

  const contact = chat?.users.filter(
    contact => contact._id !== authUser?._id
  )[0]

  useEffect(() => {
    if (!chat) return
    /* if (prevChat.current === chat._id) return */
    console.log('join chat ------', chat._id)
    socket.emit(EVENTS.CLIENT.JOIN_CHAT, {
      chatId: chat._id,
      leave: 'prevChat.current'
    })

    /* dispatch(removeNotification({ chatId: chat._id })) */

    /* prevChat.current = chat._id */
  }, [chat])

  return {
    chat,
    contact
  }
}
