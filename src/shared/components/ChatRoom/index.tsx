import { useEffect } from 'react'

import ArrowBack from '@mui/icons-material/ArrowBack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { DialogGroupDetails } from '../DialogGroupDetails'
import { DialogUserDetails } from '../DialogUserDetails'
import { SendMessageForm } from '../SendMessageForm'
import { removeChat } from '../../slices/chatSlice'
import { useSocket } from '../../hooks/useSocket'
import { ChatMessages } from '../ChatMessages'

export const ChatRoom = () => {
  const chat = useAppSelector(state => state.chat.chat)
  const authUser = useAppSelector(state => state.user.auth)

  const dispatch = useAppDispatch()

  const socket = useSocket()

  const contact = chat?.users.filter(
    contact => contact._id !== authUser?._id
  )[0]

  const handleRemoveChat = () => {
    dispatch(removeChat())
  }

  useEffect(() => {
    if (chat) {
      socket.emit('join chat', chat._id)
    }
  }, [chat, socket])

  return (
    <Box
      display={{ xs: chat ? 'flex' : 'none', md: 'flex' }}
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
              <Box display={{ xs: chat ? 'flex' : 'none', md: 'none' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<ArrowBack />}
                  onClick={handleRemoveChat}
                >
                  Voltar
                </Button>
              </Box>
              <Typography fontSize="2rem">{contact?.name}</Typography>
              {chat.isGroupChat ? (
                <DialogGroupDetails />
              ) : (
                <DialogUserDetails />
              )}
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
              overflow="auto"
            >
              {/* Chat messages */}
              <ChatMessages />
              {/* /Chat messages */}

              {/* Send messages */}
              <SendMessageForm />
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
