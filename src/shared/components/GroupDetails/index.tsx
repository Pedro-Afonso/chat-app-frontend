import { useState, useEffect, memo } from 'react'

import ListItemButton from '@mui/material/ListItemButton'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import Chip from '@mui/material/Chip'

import { AppSearchBar } from '../AppSearchBar'
import { useAppSelector } from '../../hooks'

interface IAddGroupFormProps {
  closeModal: () => void
}

const SearchListMemo = memo(() => {
  const searchList = useAppSelector(state => state.user.users)

  const handleAddToGroup = (_id: string) => {
    alert(_id + 'Foi adicionado')
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

export const GroupDetails: React.FC<IAddGroupFormProps> = ({ closeModal }) => {
  const [groupName, setGroupName] = useState('')

  const chat = useAppSelector(state => state.chat.chat)

  const memberList = chat ? chat.users : []

  useEffect(() => {
    if (!chat) return
    setGroupName(chat.name)
  }, [chat])

  const styledScroll = {
    overflow: 'auto',
    maxHeight: '100%',
    '&::-webkit-scrollbar': {
      width: '3px'
    },

    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
      borderRadius: '10px'
    },

    '&::-webkit-scrollbar-thumb': {
      background: '#fbc02d',
      borderRadius: '10px'
    },

    '&::-webkit-scrollbar-thumb:hover': {
      background: 'rgb(255, 251, 251)'
    }
  }

  const handleLeaveGroup = () => {
    alert('Você saiu do grupo')
  }

  const handleRemoveUser = (_id: string) => {
    alert(_id + 'Foi removido')
  }

  return (
    <>
      <DialogTitle>
        <Typography textAlign="center" fontSize="2rem">
          Detalhes do Chat
        </Typography>
        <TextField
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
        <AppSearchBar />
      </DialogTitle>

      <Divider />

      <DialogContent sx={styledScroll}>
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

      <DialogContent sx={styledScroll}>
        <SearchListMemo />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <Button onClick={handleLeaveGroup}>Sair do grupo</Button>
      </DialogActions>
    </>
  )
}
