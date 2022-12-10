import RemoveRedEye from '@mui/icons-material/RemoveRedEye'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { useDialogUserDetails } from './useDialogUserDetails'

export const DialogUserDetails = () => {
  const { modal, contact, handleOpenUserDetails, handleCloseModal } =
    useDialogUserDetails()

  return (
    <>
      <IconButton onClick={handleOpenUserDetails}>
        <RemoveRedEye />
      </IconButton>
      <Dialog fullWidth onClose={handleCloseModal} open={!!modal}>
        <DialogTitle>
          <Typography textAlign="center" fontSize="2rem">
            {contact?.name}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Avatar
              sx={{ width: 64, height: 64 }}
              src={contact?.profileImage}
              alt={contact?.name}
            />
            <Typography ml={2} fontSize={18}>
              {contact?.email}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
