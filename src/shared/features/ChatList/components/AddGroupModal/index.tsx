import { useState } from 'react'

import {
  Chip,
  DialogContent,
  DialogTitle,
  Divider,
  Dialog,
  Button,
  List,
  ListItem,
  ListItemButton,
  Stack,
  TextField,
  DialogActions,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material'

import {
  useCreateGroupChatMutation,
  useLazySearchUsersQuery
} from '../../../../services'
import { toogleIsAddGroupModalOpen } from '../../../../slices/potalSlice'
import { useAppSelector, useAppDispatch } from '../../../../store/index2'
import { SearchBar } from '../../../../components'

export const AddGroupModal = () => {
  const [groupName, setGroupName] = useState('')
  const [addData, setAddData] = useState<{ id: string; name: string }[]>([])

  const dispatch = useAppDispatch()

  const { isAddGroupModalOpen } = useAppSelector(state => state.portal)

  /* const searchUsers = useAppSelector(state => state.user.searchedUsers) */

  const [createGroupChat] = useCreateGroupChatMutation()

  const [triggerSearch, { data }] = useLazySearchUsersQuery()

  const searchUsers = data || []

  const handleCloseModal = () => {
    dispatch(toogleIsAddGroupModalOpen())
  }

  const handleCreateGroup = () => {
    if (!groupName || addData.length < 2) return

    createGroupChat({
      name: groupName,
      users: addData.map(data => data.id)
    })

    dispatch(toogleIsAddGroupModalOpen())

    setGroupName('')
    setAddData([])
  }

  return (
    <Dialog fullWidth onClose={handleCloseModal} open={isAddGroupModalOpen}>
      <DialogTitle>Criar um novo grupo</DialogTitle>
      <DialogContent>
        <TextField
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
        <SearchBar triggerSearch={triggerSearch} />
        <Divider />
        <Stack direction="row" flexWrap={'wrap'} gap={1}>
          {addData.map(({ id, name }) => (
            <Chip
              key={id}
              label={name}
              onDelete={() =>
                setAddData(prev => prev.filter(({ id: _id }) => _id !== id))
              }
            />
          ))}
        </Stack>
        <List>
          {searchUsers.map(
            ({ _id, name, email, profileImage }) =>
              !addData.map(obj => obj.id).includes(_id) && (
                <ListItem key={_id} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      setAddData(prev => [{ id: _id, name }, ...prev])
                    }
                  >
                    <ListItemIcon>
                      <Avatar src={profileImage} alt={name} />
                    </ListItemIcon>
                    <ListItemText primary={name} secondary={email} />
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancelar</Button>
        <Button onClick={handleCreateGroup}>Criar grupo</Button>
      </DialogActions>
    </Dialog>
  )
}
