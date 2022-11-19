import { useEffect } from 'react'

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { getAllMessages } from '../../slices/messageSlice'

export const ChatMessages = () => {
  const dispatch = useAppDispatch()
  const userAuth = useAppSelector(state => state.user.auth)
  const chat = useAppSelector(state => state.chat.chat)
  const messages = useAppSelector(state => state.message.chatMessages)

  const styledScroll = {
    overflow: 'auto',
    maxHeight: '100%',
    '&::-webkit-scrollbar': {
      width: '3px'
    },

    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
      borderRadius: '10px'
    },

    '&::-webkit-scrollbar-thumb': {
      background: '#fbc02d',
      borderRadius: '10px'
    },

    '&::-webkit-scrollbar-thumb:hover': {
      background: 'rgb(255, 251, 251)'
    }
  }

  useEffect(() => {
    if (chat) {
      dispatch(getAllMessages(chat._id))
    }
  }, [dispatch, chat])

  return (
    <Box
      display="flex"
      flexDirection="column-reverse"
      component={Paper}
      elevation={24}
      flexGrow={1}
      sx={styledScroll}
    >
      {messages.map(({ _id, sender, content }) => (
        <Box
          key={_id}
          display="flex"
          flexDirection={userAuth?._id === sender._id ? 'row-reverse' : 'row'}
          marginX={1}
          marginBottom={1}
        >
          {userAuth?._id !== sender._id ? (
            <Box
              component={Paper}
              display="flex"
              alignItems="center"
              marginRight={8}
              paddingRight="0.5rem"
              paddingLeft="0.25rem"
              paddingY="0.25rem"
              borderRadius="10px"
              flexDirection="row"
            >
              <Avatar src={sender.profileImage} alt={sender.name} />
              <Typography ml={1}>
                <Typography component="span">{sender.name}: </Typography>
                {content}
              </Typography>
            </Box>
          ) : (
            <Box
              component={Paper}
              display="flex"
              alignItems="center"
              marginLeft={8}
              paddingLeft="0.5rem"
              paddingRight="0.25rem"
              paddingY="0.25rem"
              borderRadius="20px"
              flexDirection="row-reverse"
            >
              <Avatar src={sender.profileImage} alt={sender.name} />
              <Typography textAlign="right" mr={1}>
                {content}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}
