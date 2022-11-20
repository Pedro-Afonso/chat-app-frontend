import { useEffect } from 'react'

import Box from '@mui/material/Box'

import { AppNavBar, ChatList, ChatRoom } from '../../shared/components'
import { getCurrentUser } from '../../shared/slices/userSlice'
import { getAllChatsByUser } from '../../shared/slices/chatSlice'
import { useAppDispatch } from '../../shared/hooks'

export const Chat = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getAllChatsByUser())
  }, [dispatch])

  return (
    <Box height="100vh">
      <AppNavBar />

      <Box display={{ xs: 'block', md: 'flex' }} justifyContent="space-evenly">
        <ChatList />
        <ChatRoom />
      </Box>
    </Box>
  )
}
