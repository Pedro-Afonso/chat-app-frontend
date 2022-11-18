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

interface userProps {
  _id: string
  name: string
  email: string
  profileImage?: string
}

interface IAddGroupFormProps {
  memberList: userProps[]
  searchList: userProps[]

  groupName: string
  query: string

  setGroupName: (v: string) => void
  setQuery: React.Dispatch<React.SetStateAction<string>>

  closeModal: () => void
  handleRemoveUser: (_id: string) => void
  handleAddToGroup: (_id: string) => void
  handleLeaveGroup: () => void
}

export const GroupDetails: React.FC<IAddGroupFormProps> = ({
  memberList,
  searchList,
  groupName,
  query,

  setGroupName,
  setQuery,

  closeModal,
  handleRemoveUser,
  handleAddToGroup,
  handleLeaveGroup
}) => {
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
        <AppSearchBar query={query} setQuery={setQuery} />
      </DialogTitle>

      <Divider />

      <DialogContent sx={styledScroll}>
        <Stack direction="row" flexWrap={'wrap'} gap={1}>
          {memberList.map(({ _id, name }) => (
            <Chip
              key={_id}
              label={name}
              onDelete={() => handleRemoveUser(_id)}
            />
          ))}
        </Stack>
      </DialogContent>

      <Divider />

      <DialogContent sx={styledScroll}>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancelar</Button>
        <Button onClick={handleLeaveGroup}>Sair do grupo</Button>
      </DialogActions>
    </>
  )
}
