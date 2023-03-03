/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useState } from 'react'

import {
  ListItemButton,
  DialogContent,
  DialogActions,
  ListItemIcon,
  ListItemText,
  DialogTitle,
  Typography,
  TextField,
  ListItem,
  Divider,
  Avatar,
  Dialog,
  Button,
  Stack,
  List,
  Chip,
  Box
} from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../store/index2'
import { toogleIsGroupDetailsModalOpen } from '../../../../slices/potalSlice'
import {
  useAddToGroupMutation,
  useRemoveUserMutation,
  useRenameGroupMutation
} from '../../../../services'

const SearchListMemo = memo(({ chatId }: { chatId: string }) => {
  const searchList = useAppSelector(state => state.user.users)
  const [addToGroup] = useAddToGroupMutation()

  const handleAddToGroup = (userId: string) => {
    if (!chatId || !userId) return
    addToGroup({ chatId, userId })
  }
  return (
    <List>
      {searchList.map(({ _id, name, email, profileImage }) => (
        <ListItem key={_id} disablePadding>
          <ListItemButton onClick={() => handleAddToGroup(_id)}>
            <ListItemIcon>
              <Avatar src={profileImage} alt={name} />
            </ListItemIcon>
            <ListItemText primary={name} secondary={email} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
})

export const GroupDetailsModal = () => {
  const [groupName, setGroupName] = useState('')
  const dispatch = useAppDispatch()
  const chat = useAppSelector(state => state.chat.chat)
  const { isGroupDetailsModalOpen } = useAppSelector(state => state.portal)
  const memberList = useAppSelector(state =>
    state.chat.chat ? state.chat.chat.users : []
  )
  const [renameGroup] = useRenameGroupMutation()
  const [removeUser] = useRemoveUserMutation()

  const adminId = chat && chat.groupAdmin ? chat.groupAdmin._id : ''
  const chatId = chat ? chat._id : ''

  useEffect(() => {
    if (!chat) return
    setGroupName(chat.name)
  }, [chat])

  const handleCloseModal = () => {
    dispatch(toogleIsGroupDetailsModalOpen())
  }

  const handleRenameGroup = () => {
    if (!chatId || !groupName) return
    renameGroup({ chatId, newChatName: groupName })
  }

  const handleLeaveGroup = () => {
    alert('Você saiu do grupo')
  }

  const handleRemoveUser = (userId: string) => {
    if (adminId === userId) return
    removeUser({ userId, chatId })
  }

  return (
    <Dialog fullWidth onClose={handleCloseModal} open={isGroupDetailsModalOpen}>
      <DialogTitle>
        <Typography textAlign="center" fontSize="2rem">
          Detalhes do Chat
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          <TextField
            autoComplete="off"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            fullWidth
            size="small"
          />
          <Button
            onClick={handleRenameGroup}
            color="info"
            variant="contained"
            sx={{ ml: 2 }}
          >
            Renomear
          </Button>
        </Box>
        {/*  <AppSearchBar /> */}
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Stack direction="row" flexWrap={'wrap'} gap={1}>
          {memberList.map(({ _id, name, profileImage }) => (
            <Chip
              key={_id}
              label={name}
              avatar={<Avatar src={profileImage} alt={name} />}
              onDelete={() => handleRemoveUser(_id)}
            />
          ))}
        </Stack>
      </DialogContent>

      <Divider />

      <DialogContent>
        <SearchListMemo chatId={chatId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancelar</Button>
        <Button onClick={handleLeaveGroup}>Sair do grupo</Button>
      </DialogActions>
    </Dialog>
  )
}
