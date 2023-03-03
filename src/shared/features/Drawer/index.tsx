import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
/* import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton' */
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import DrawerMui from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'

import { SearchBar } from '../../components'
import { useAccessChatMutation, useLazySearchUsersQuery } from '../../services'
import { useAppDispatch, useAppSelector } from '../../store/index2'
import { toogleIsDrawerOpen } from '../../slices/potalSlice'

export const Drawer = () => {
  const [triggerSearch, { data: users }] = useLazySearchUsersQuery()

  const [accessChat] = useAccessChatMutation({
    fixedCacheKey: 'chat-room'
  })

  const { isDrawerOpen } = useAppSelector(state => state.portal)

  const dispatch = useAppDispatch()

  const handleCloseDrawer = () => {
    dispatch(toogleIsDrawerOpen())
  }

  const handleAccessChat = (userId: string) => {
    accessChat({ userId })
  }

  return (
    <DrawerMui anchor="left" open={isDrawerOpen} onClose={handleCloseDrawer}>
      <ListItem>
        <SearchBar triggerSearch={triggerSearch} />
      </ListItem>
      <Divider />
      <Box
        sx={{ width: 300 }}
        role="presentation"
        /*         onClick={handleCloseNavMenu}
        onKeyDown={handleCloseNavMenu} */
      >
        <List>
          {users?.map(({ _id, name, email, profileImage }) => (
            <ListItem key={_id} disablePadding>
              <ListItemButton onClick={() => handleAccessChat(_id)}>
                <ListItemIcon>
                  <Avatar src={profileImage} alt={name} />
                </ListItemIcon>
                <ListItemText primary={name} secondary={email} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </DrawerMui>
  )
}
