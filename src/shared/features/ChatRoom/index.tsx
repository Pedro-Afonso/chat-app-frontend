import { useEffect } from 'react'

import { Typography, IconButton, Paper, Box } from '@mui/material'
import RemoveRedEye from '@mui/icons-material/RemoveRedEye'

import { useAppSelector, useAppDispatch } from '../../store/index2'

import {
  toogleIsGroupDetailsModalOpen,
  toogleIsUserDetailsModalOpen
} from '../../slices/potalSlice'

import {
  GroupDetailsModal,
  UserDetailsModal,
  SendMessageForm,
  ChatMessages
} from './components'
import { useSocket } from '../../hooks/useSocket'
import { TMessage } from '../../types'
import { receivedMessage } from '../../slices/messageSlice'
import { EVENTS } from '../../utils/constants'

export const ChatRoom = () => {
  const dispatch = useAppDispatch()

  const chat = useAppSelector(state => state.chat.chat)

  const authUser = useAppSelector(state => state.user.auth)

  const socket = useSocket()

  const contact = chat?.users.filter(
    contact => contact._id !== authUser?._id
  )[0]

  useEffect(() => {
    if (!chat) return
    socket.emit(EVENTS.CLIENT.JOIN_CHAT, {
      chatId: chat._id /* ,
      leave: 'prevChat.current' */
    })
  }, [chat])

  useEffect(() => {
    const handleReceiveMessage = (message: TMessage) => {
      dispatch(receivedMessage(message))
    }

    socket.on(EVENTS.SERVER.RECEIVED_MESSAGE, handleReceiveMessage)

    return () => {
      socket.off(EVENTS.SERVER.RECEIVED_MESSAGE, handleReceiveMessage)
    }
  }, [])

  const handleOpenGroupDetails = () => {
    dispatch(toogleIsGroupDetailsModalOpen())
  }

  const handleOpenUserDetails = () => {
    dispatch(toogleIsUserDetailsModalOpen())
  }

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
              {chat.isGroupChat ? (
                <>
                  <Typography fontSize="2rem">{chat?.name}</Typography>
                  {/* <DialogGroupDetails /> */}
                  <IconButton onClick={handleOpenGroupDetails}>
                    <RemoveRedEye />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography fontSize="2rem">{contact?.name}</Typography>
                  <IconButton onClick={handleOpenUserDetails}>
                    <RemoveRedEye />
                  </IconButton>
                </>
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
      {/* Modais */}
      <GroupDetailsModal />
      <UserDetailsModal />
    </Box>
  )
}
