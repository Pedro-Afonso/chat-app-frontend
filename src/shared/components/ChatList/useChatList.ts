import { useState } from 'react'

import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { accessChat, selectChat } from '../../slices/chatSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

export const useChatList = () => {
  const dispatch = useAppDispatch()
  const chatList = useAppSelector(state => state.chat.chats)
  const [isOpen, setIsOpen] = useState(false)

  const theme = useTheme()

  const isUpMd = useMediaQuery(theme.breakpoints.up('md'))

  const handleCloseDrawer = () => {
    setIsOpen(false)
  }

  const handleOpenDrawer = () => {
    setIsOpen(true)
  }

  const handleAccessChat = (userId: string) => {
    dispatch(accessChat({ userId }))
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
    handleAccessChat,
    handleAccessGroupChat,
    isUpMd,
    isOpen,
    handleCloseDrawer,
    handleOpenDrawer
  }
}
