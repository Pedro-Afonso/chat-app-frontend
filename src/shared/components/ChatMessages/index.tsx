import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { useChatMessages } from './useChatMessages'
import { Typing } from '../Typing'

export const ChatMessages = () => {
  const { userAuth, messages } = useChatMessages()

  return (
    <Box
      display="flex"
      flexDirection="column-reverse"
      component={Paper}
      elevation={24}
      flexGrow={1}
    >
      <Typing />
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
