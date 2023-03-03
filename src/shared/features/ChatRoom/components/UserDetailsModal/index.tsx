import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../../../../store/index2'
import { toogleIsUserDetailsModalOpen } from '../../../../slices/potalSlice'

export const UserDetailsModal = () => {
  const dispatch = useAppDispatch()

  const { isUserDetailsModalOpen } = useAppSelector(state => state.portal)

  const authUser = useAppSelector(state => state.user.user)
  const chat = useAppSelector(state => state.chat.chat)

  const contact =
    chat && authUser && chat.users.filter(user => user._id !== authUser._id)[0]

  const handleOpenUserDetails = () => {
    dispatch(toogleIsUserDetailsModalOpen())
  }

  return (
    <>
      <Dialog
        fullWidth
        onClose={handleOpenUserDetails}
        open={isUserDetailsModalOpen}
      >
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
          <Button onClick={handleOpenUserDetails}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
