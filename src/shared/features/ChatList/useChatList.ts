import { useState } from 'react'

import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { useAppDispatch, useAppSelector } from '../../store/index2'
import { TUser } from '../../interface'
import {
  useAccessChatMutation,
  useGetAllChatsByUserQuery
} from '../../services'
import { selectChat } from '../../slices/chatSlice'

export const useChatList = () => {
  const dispatch = useAppDispatch()
  const authUser = useAppSelector(state => state.user.user)
  const chatList = useAppSelector(state => state.chat.chats)
  //  const activeChat = useAppSelector(state => state.chat.chat)
  /*   const { data } = useGetAllChatsByUserQuery()

  const chatList = data || [] */

  useGetAllChatsByUserQuery()

  const [accessChat] = useAccessChatMutation()

  const [isOpen, setIsOpen] = useState(false)

  const theme = useTheme()

  const isUpMd = useMediaQuery(theme.breakpoints.up('md'))

  const removeAuthUser = (users: TUser[]) => {
    if (authUser) {
      return users.filter(user => user._id !== authUser._id)[0]
    } else {
      return users[0]
    }
  }

  const handleCloseDrawer = () => {
    setIsOpen(false)
  }

  const handleOpenDrawer = () => {
    setIsOpen(true)
  }

  const handleAccessChat = (userId: string) => {
    accessChat({ userId })
    if (!isUpMd) {
      handleCloseDrawer()
    }
  }

  const handleAccessGroupChat = (chatId: string) => {
    dispatch(selectChat(chatId))
    if (!isUpMd) {
      handleCloseDrawer()
    }
  }

  return {
    chatList,
    isUpMd,
    isOpen,
    removeAuthUser,
    handleAccessChat,
    handleAccessGroupChat,
    handleCloseDrawer,
    handleOpenDrawer
  }
}
