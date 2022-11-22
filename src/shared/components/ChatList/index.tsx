import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { ChatListHeader } from '../ChatListHeader'
import { accessChat, selectChat } from '../../slices/chatSlice'

export const ChatList = () => {
  const dispatch = useAppDispatch()
  const chat = useAppSelector(state => state.chat.chat)
  const chatList = useAppSelector(state => state.chat.chats)

  const typographyStyle: React.CSSProperties = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  const handleAccessChat = (userId: string) => {
    dispatch(accessChat({ userId }))
  }

  const handleAccessGroupChat = (chatId: string) => {
    dispatch(selectChat(chatId))
  }

  return (
    <Box
      display={{ xs: !chat ? 'flex' : 'none', md: 'flex' }}
      width={{ xs: '100%', md: '35vw' }}
      padding={{ xs: '1rem', md: '1rem' }}
      paddingBottom="0px"
    >
      <Box
        component={Paper}
        width="100%"
        flexGrow={1}
        height="calc(100vh - 100px)"
      >
        <List subheader={<ChatListHeader />}>
          {chatList.map(({ _id, name, isGroupChat, latestMessage, users }) => (
            <ListItem key={_id} disablePadding>
              {isGroupChat ? (
                <ListItemButton onClick={() => handleAccessGroupChat(_id)}>
                  <ListItemText
                    primary={name}
                    secondary={
                      latestMessage
                        ? latestMessage.sender.name +
                          ': ' +
                          latestMessage?.content
                        : 'Seja o primeiro a enviar uma mensagem 😊'
                    }
                    primaryTypographyProps={{ style: typographyStyle }}
                    secondaryTypographyProps={{ style: typographyStyle }}
                  />
                </ListItemButton>
              ) : (
                <ListItemButton onClick={() => handleAccessChat(users[0]._id)}>
                  <ListItemIcon>
                    <Avatar src={users[0].profileImage} alt={users[0].name} />
                  </ListItemIcon>
                  <ListItemText
                    primary={users[0].name}
                    secondary={
                      latestMessage?.content || 'Envie uma mensagem 😊'
                    }
                    primaryTypographyProps={{ style: typographyStyle }}
                    secondaryTypographyProps={{ style: typographyStyle }}
                  />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
