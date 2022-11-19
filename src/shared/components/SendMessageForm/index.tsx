import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Send from '@mui/icons-material/Send'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export const SendMessageForm = () => {
  const [message, setMessage] = useState('')

  return (
    <Box component="form" display="flex" alignContent="center">
      <Box component={Paper} flexGrow={1} variant="elevation" elevation={24}>
        <TextField
          autoComplete="off"
          multiline={true}
          maxRows={4}
          fullWidth
          placeholder="Envie uma mensagem..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton size="large">
          <Send />
        </IconButton>
      </Box>
    </Box>
  )
}
