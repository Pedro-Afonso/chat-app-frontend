import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Add from '@mui/icons-material/Add'

import { AddGroupForm } from '../AddGroupForm'
import { useAddDialogGroup } from './useDialogAddGroup'

export const DialogAddGroup = () => {
  const { modal, handleCloseModal, handleOpenModal } = useAddDialogGroup()

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="outlined"
        endIcon={<Add />}
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}
      >
        Criar um grupo
      </Button>

      <Dialog fullWidth onClose={handleCloseModal} open={!!modal}>
        <AddGroupForm closeModal={handleCloseModal} />
      </Dialog>
    </>
  )
}
