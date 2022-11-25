import { forwardRef } from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearChatMessage, clearChatError } from '../../slices/chatSlice'
import { clearMessageError } from '../../slices/messageSlice'
import { clearUserError } from '../../slices/userSlice'

interface IBasicSnackbarProps {
  message: string | null
  severity?: AlertColor
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const BasicSnackbar: React.FC<IBasicSnackbarProps> = ({
  message,
  severity,
  handleClose
}) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {message ? (
        <Snackbar
          open={!!message}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : null}
    </Stack>
  )
}

export const AppSnackBar = () => {
  const dispatch = useAppDispatch()

  const chatMessage = useAppSelector(state => state.chat.message)
  const chatError = useAppSelector(state => state.chat.error)
  const messageError = useAppSelector(state => state.message.error)
  const userError = useAppSelector(state => state.user.error)

  const handleCloseChatMessage = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(clearChatMessage())
  }

  const handleCloseChatError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(clearChatError())
  }

  const handleCloseMessageError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(clearMessageError())
  }

  const handleCloseUserError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(clearUserError())
  }

  return (
    <>
      <BasicSnackbar
        message={chatMessage}
        handleClose={handleCloseChatMessage}
      />
      <BasicSnackbar
        message={chatError}
        handleClose={handleCloseChatError}
        severity="error"
      />
      <BasicSnackbar
        message={messageError}
        handleClose={handleCloseMessageError}
        severity="error"
      />
      <BasicSnackbar
        message={userError}
        handleClose={handleCloseUserError}
        severity="error"
      />
    </>
  )
}
