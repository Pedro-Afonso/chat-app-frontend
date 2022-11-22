import { memo } from 'react'

import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import ListItemButton from '@mui/material/ListItemButton'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { addToGroup } from '../../slices/chatSlice'
import { AppSearchBar } from '../AppSearchBar'
import { useDialogAddDetails } from './useDialogAddDetails'

const SearchListMemo = memo(({ chatId }: { chatId: string }) => {
  const searchList = useAppSelector(state => state.user.users)
  const dispatch = useAppDispatch()

  const handleAddToGroup = (userId: string) => {
    if (!chatId || !userId) return
    dispatch(addToGroup({ chatId, userId }))
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

export const DialogGroupDetails = () => {
  const {
    groupName,
    setGroupName,
    modal,
    chatId,
    memberList,
    handleOpenGroupDetails,
    handleCloseModal,
    handleRenameGroup,
    handleLeaveGroup,
    handleRemoveUser
  } = useDialogAddDetails()

  return (
    <>
      <IconButton onClick={handleOpenGroupDetails}>
        <RemoveRedEye />
      </IconButton>
      <Dialog fullWidth onClose={handleCloseModal} open={!!modal}>
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
          <AppSearchBar />
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
    </>
  )
}
