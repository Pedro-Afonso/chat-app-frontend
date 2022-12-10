import ListItemButton from '@mui/material/ListItemButton'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import Chip from '@mui/material/Chip'

import { AppSearchBar } from '../../AppSearchBar'
import { useAddGroupForm } from './useAddGroupForm'

interface IAddGroupFormProps {
  closeModal: () => void
}

export const AddGroupForm: React.FC<IAddGroupFormProps> = ({ closeModal }) => {
  const {
    setGroupName,
    setAddData,
    groupName,
    addData,
    userList,
    handleCreateGroup
  } = useAddGroupForm(closeModal)

  return (
    <>
      <DialogTitle>Criar um novo grupo</DialogTitle>
      <DialogContent>
        <TextField
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
        <AppSearchBar />
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
          {userList.map(
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
        <Button onClick={closeModal}>Cancelar</Button>
        <Button onClick={handleCreateGroup}>Criar grupo</Button>
      </DialogActions>
    </>
  )
}
