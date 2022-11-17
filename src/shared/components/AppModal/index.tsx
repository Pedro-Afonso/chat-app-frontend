import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'

interface IAppModalProps {
  children?: React.ReactNode
  isModalOpen: boolean
  handleCloseModal: () => void
}

export const AppModal: React.FC<IAppModalProps> = ({
  isModalOpen,
  handleCloseModal,
  children
}) => {
  return (
    <Dialog onClose={handleCloseModal} open={isModalOpen}>
      <DialogTitle>Modal</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}
