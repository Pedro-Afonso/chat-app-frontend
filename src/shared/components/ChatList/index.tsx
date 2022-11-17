import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { TChat } from '../../interface'

interface IChatListProps {
  chatList: TChat[]
}

export const ChatList: React.FC<IChatListProps> = ({ chatList }) => {
  const typographyStyle: React.CSSProperties = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  return (
    <Box
      display="flex"
      width={{ xs: '100%', md: '35vw' }}
      padding={{ xs: '1rem', md: '1rem' }}
      paddingBottom="0px"
    >
      <Box
        component={Paper}
        width="100%"
        flexGrow={1}
        minHeight="50vh"
        maxHeight="90vh"
      >
        <List>
          {chatList.map(({ _id, name, isGroupChat, latestMessage, users }) => (
            <ListItem key={_id} disablePadding>
              {isGroupChat ? (
                <ListItemButton>
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
                <ListItemButton>
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
