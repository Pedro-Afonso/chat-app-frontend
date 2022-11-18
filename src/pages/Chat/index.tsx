import { useEffect, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'

import {
  getCurrentUser,
  logout as logoutAction,
  searchUsers
} from '../../shared/slices/userSlice'
import { useAppDispatch, useAppSelector, useDebounce } from '../../shared/hooks'
import {
  createGroupChat,
  getAllChatsByUser
} from '../../shared/slices/chatSlice'
import {
  AddGroupForm,
  AppSearchBar,
  ChatList,
  ChatListHeader,
  ChatRoom
} from '../../shared/components'
import { AppDrawer } from '../../shared/components/AppDrawer'
import { AppNavBar } from '../../shared/components/AppNavBar'

type TModal = 'ADD_GROUP' | null

export const Chat = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [query, setQuery] = useState('')

  const [modal, setModal] = useState<TModal>(null)
  const [groupName, setGroupName] = useState('')
  const [addData, setAddData] = useState<{ id: string; name: string }[]>([])

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

  const handleCreateGroup = () => {
    if (!groupName || addData.length < 2) return

    dispatch(
      createGroupChat({
        name: groupName,
        users: addData.map(data => data.id)
      })
    )
    setQuery('')
    setGroupName('')
    setModal(null)
    setAddData([])
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
      <Dialog fullWidth onClose={handleCloseModal} open={!!modal}>
        {modal === 'ADD_GROUP' && (
          <AddGroupForm
            userList={users}
            groupName={groupName}
            setGroupName={setGroupName}
            addData={addData}
            setAddData={setAddData}
            query={query}
            setQuery={setQuery}
            closeModal={handleCloseModal}
            handleCreateGroup={handleCreateGroup}
          />
        )}
      </Dialog>
    </Box>
  )
}
