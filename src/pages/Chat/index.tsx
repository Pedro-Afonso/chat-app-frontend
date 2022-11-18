import { useEffect, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'

import {
  getCurrentUser,
  logout as logoutAction
} from '../../shared/slices/userSlice'
import { useAppDispatch } from '../../shared/hooks'
import { getAllChatsByUser } from '../../shared/slices/chatSlice'
import {
  AddGroupForm,
  ChatList,
  ChatRoom,
  GroupDetails
} from '../../shared/components'
import { AppDrawer } from '../../shared/components/AppDrawer'
import { AppNavBar } from '../../shared/components/AppNavBar'

type TModal = 'ADD_GROUP' | 'GROUP_DETAILS' | null

export const Chat = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const [modal, setModal] = useState<TModal>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getAllChatsByUser())
  }, [dispatch])

  const logout = () => dispatch(logoutAction())

  const handleCloseModal = () => {
    setModal(null)
  }

  const handleOpenAddGroupModal = () => {
    setModal('ADD_GROUP')
  }

  const handleOpenGroupDetailsModal = () => {
    setModal('GROUP_DETAILS')
  }

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
        <ChatList handleOpenAddGroupModal={handleOpenAddGroupModal} />
        <ChatRoom openGroupDetails={handleOpenGroupDetailsModal} />
      </Box>

      <Dialog fullWidth onClose={handleCloseModal} open={!!modal}>
        {modal === 'ADD_GROUP' && (
          <AddGroupForm closeModal={handleCloseModal} />
        )}
        {modal === 'GROUP_DETAILS' && (
          <GroupDetails closeModal={handleCloseModal} />
        )}
      </Dialog>
    </Box>
  )
}
