import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'

import {
  AppDrawer,
  AppNavBar,
  ChatList,
  ChatRoom
} from '../../shared/components'
import {
  getCurrentUser,
  logout as logoutAction
} from '../../shared/slices/userSlice'
import { getAllChatsByUser } from '../../shared/slices/chatSlice'
import { useAppDispatch } from '../../shared/hooks'

export const Chat = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getAllChatsByUser())
  }, [dispatch])

  const logout = () => dispatch(logoutAction())

  return (
    <Box height="100vh">
      <AppNavBar
        setAnchorElNav={setAnchorElNav}
        anchorElUser={anchorElUser}
        setAnchorElUser={setAnchorElUser}
        logout={logout}
      />
      <AppDrawer setAnchorElNav={setAnchorElNav} anchorElNav={anchorElNav} />

      <Box display={{ xs: 'block', md: 'flex' }} justifyContent="space-evenly">
        <ChatList />
        <ChatRoom />
      </Box>
    </Box>
  )
}
