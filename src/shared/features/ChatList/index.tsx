import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import Box from '@mui/material/Box'

import { ChatListHeader, AddGroupModal } from './components'
import { useChatList } from './useChatList'

interface IConditionalDrawer {
  isOpen: boolean
  isUpMd: boolean
  handleCloseDrawer: () => void
  handleOpenDrawer: () => void
  children: React.ReactNode
}

const ConditionalDrawer: React.FC<IConditionalDrawer> = ({
  isOpen,
  isUpMd,
  handleCloseDrawer,
  handleOpenDrawer,
  children
}) => {
  return (
    <>
      {!isUpMd ? (
        <>
          <Drawer open={isOpen} onClose={handleCloseDrawer}>
            {children}
          </Drawer>
          <Box
            display={{ xs: !isOpen ? 'flex' : 'none', md: 'none' }}
            position="absolute"
          >
            <Button
              variant="contained"
              size="small"
              color="error"
              startIcon={<ArrowBack />}
              onClick={handleOpenDrawer}
            >
              Chats
            </Button>
          </Box>{' '}
        </>
      ) : null}
      {isUpMd ? (
        <Box
          display={{ xs: 'none', md: 'flex' }}
          width={{ xs: '100%', md: '35vw' }}
          padding={{ xs: '1rem', md: '1rem' }}
          paddingBottom="0px"
        >
          {children}
        </Box>
      ) : null}
    </>
  )
}

export const ChatList = () => {
  const {
    isOpen,
    isUpMd,
    chatList,
    removeAuthUser,
    handleCloseDrawer,
    handleOpenDrawer,
    handleAccessChat,
    handleAccessGroupChat
  } = useChatList()

  const typographyStyle: React.CSSProperties = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  return (
    <>
      <ConditionalDrawer
        isOpen={isOpen}
        isUpMd={isUpMd}
        handleCloseDrawer={handleCloseDrawer}
        handleOpenDrawer={handleOpenDrawer}
      >
        <Box
          component={Paper}
          width="100%"
          flexGrow={1}
          height="calc(100vh - 100px)"
        >
          <List subheader={<ChatListHeader />}>
            {chatList.map(
              ({ _id, name, isGroupChat, latestMessage, users }) => (
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
                    <ListItemButton
                      onClick={() =>
                        handleAccessChat(removeAuthUser(users)._id)
                      }
                    >
                      <ListItemIcon>
                        <Avatar
                          src={removeAuthUser(users).profileImage}
                          alt={removeAuthUser(users).name}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={removeAuthUser(users).name}
                        secondary={
                          latestMessage?.content || 'Envie uma mensagem 😊'
                        }
                        primaryTypographyProps={{ style: typographyStyle }}
                        secondaryTypographyProps={{ style: typographyStyle }}
                      />
                    </ListItemButton>
                  )}
                </ListItem>
              )
            )}
          </List>
        </Box>
      </ConditionalDrawer>
      <AddGroupModal />
    </>
  )
}
