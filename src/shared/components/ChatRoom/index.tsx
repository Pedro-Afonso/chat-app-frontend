import Details from '@mui/icons-material/RemoveRedEye'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Send from '@mui/icons-material/Send'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { useAppSelector } from '../../hooks'

interface IChatRoomProps {
  openGroupDetails: () => void
}

export const ChatRoom: React.FC<IChatRoomProps> = ({ openGroupDetails }) => {
  const chat = useAppSelector(state => state.chat.chat)

  return (
    <Box
      display="flex"
      width={{ xs: '100%', md: '60vw' }}
      padding={{ xs: '1rem', md: '1rem' }}
      paddingBottom="0px"
    >
      <Box
        component={Paper}
        width="100%"
        flexGrow={1}
        height="calc(100vh - 100px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {chat && (
          <Box display="flex" flexDirection="column" height="100%" width="100%">
            {/* Chat header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              paddingY={1}
              paddingX={3}
            >
              <Typography fontSize="2rem">{chat.name}</Typography>
              <IconButton onClick={openGroupDetails}>
                <Details />
              </IconButton>
            </Box>
            {/* /Chat header */}

            {/* Chat body */}
            <Box
              paddingX={2}
              paddingBottom={2}
              flexGrow={1}
              display="flex"
              gap={1}
              flexDirection="column"
              justifyContent="space-between"
            >
              {/* Chat messages */}
              <Box component={Paper} elevation={24} flexGrow={1}></Box>
              {/* /Chat messages */}

              {/* Send messages */}
              <Box component="form" display="flex" alignContent="center">
                <Box
                  component={Paper}
                  flexGrow={1}
                  variant="elevation"
                  elevation={24}
                >
                  <TextField
                    autoComplete="off"
                    multiline={true}
                    maxRows={4}
                    fullWidth
                    placeholder="Envie uma mensagem..."
                  />
                </Box>
                <Box display="flex" alignItems="center">
                  <IconButton size="large">
                    <Send />
                  </IconButton>
                </Box>
              </Box>
              {/* /Send messages */}
            </Box>
            {/* /Chat body */}
          </Box>
        )}

        {/* shows this message when no chat is selected */}
        {!chat && (
          <Typography fontSize="2rem" textAlign="center">
            Clique em um usuário e inicie uma conversa
          </Typography>
        )}
      </Box>
    </Box>
  )
}
