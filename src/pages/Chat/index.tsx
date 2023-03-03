import { useEffect } from 'react'

import Box from '@mui/material/Box'

/* import { getCurrentUser } from '../../shared/slices/userSlice'
import { getAllChatsByUser } from '../../shared/slices/chatSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks' */
import { useSocket } from '../../shared/hooks/useSocket'
import { useGetCurrentUserQuery } from '../../shared/services/userService'
import { Navbar, Drawer, ChatRoom, ChatList } from '../../shared/features'
import { EVENTS } from '../../shared/utils/constants'

export const Chat = () => {
  const socket = useSocket()

  const { data: user } = useGetCurrentUserQuery()

  useEffect(() => {
    if (user) {
      socket.emit(EVENTS.CLIENT.SETUP, { userId: user._id })
    }
  }, [user, socket])

  return (
    <Box height="100vh">
      <Navbar />

      <Box display={{ xs: 'block', md: 'flex' }} justifyContent="space-evenly">
        <ChatList />
        <ChatRoom />
      </Box>
      <Drawer />
    </Box>
  )
}
