import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'

import {
  getCurrentUser,
  logout as logoutAction,
  searchUsers
} from '../../shared/slices/userSlice'
import { useAppDispatch, useAppSelector, useDebounce } from '../../shared/hooks'
import { getAllChatsByUser } from '../../shared/slices/chatSlice'
import {
  AppModal,
  AppSearchBar,
  ChatList,
  ChatListHeader,
  ChatRoom
} from '../../shared/components'
import { AppDrawer } from '../../shared/components/AppDrawer'
import { AppNavBar } from '../../shared/components/AppNavBar'

export const Chat = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [query, setQuery] = useState('')
  type TModal = 'ADD_GROUP' | null
  const [modal, setModal] = useState<TModal>(null)

  const dispatch = useAppDispatch()
  const users = useAppSelector(state => state.user.users)
  const chats = useAppSelector(state => state.chat.chats)

  const { debounce } = useDebounce()

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getAllChatsByUser())
  }, [dispatch])

  useEffect(() => {
    debounce(() => {
      dispatch(searchUsers(query))
    })
  }, [query, debounce, dispatch])

  const logout = () => dispatch(logoutAction())
  const handleCloseModal = () => {
    setModal(null)
  }
  const handleOpenAddGroupModal = () => {
    setModal('ADD_GROUP')
  }

  return (
    <Box height="100vh">
      <AppNavBar
        setAnchorElNav={setAnchorElNav}
        anchorElUser={anchorElUser}
        setAnchorElUser={setAnchorElUser}
        logout={logout}
      />
      <AppDrawer
        setAnchorElNav={setAnchorElNav}
        anchorElNav={anchorElNav}
        userList={users}
      >
        <AppSearchBar query={query} setQuery={setQuery} />
      </AppDrawer>
      <Box display={{ xs: 'block', md: 'flex' }} justifyContent="space-evenly">
        <ChatList chatList={chats}>
          <ChatListHeader handleOpenAddGroupModal={handleOpenAddGroupModal} />
        </ChatList>
        <ChatRoom chat={'Clique em um usuário e inicie uma conversa'} />
      </Box>
      <AppModal isModalOpen={!!modal} handleCloseModal={handleCloseModal}>
        teste
      </AppModal>
    </Box>
  )
}
