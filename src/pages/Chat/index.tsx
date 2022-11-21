import { useEffect } from 'react'

import Box from '@mui/material/Box'

import { AppNavBar, ChatList, ChatRoom } from '../../shared/components'
import { getCurrentUser } from '../../shared/slices/userSlice'
import { getAllChatsByUser } from '../../shared/slices/chatSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { useSocket } from '../../shared/hooks/useSocket'

export const Chat = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)
  const socket = useSocket()

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getAllChatsByUser())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      socket.emit('setup', user)
    }
  }, [user, socket])

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
