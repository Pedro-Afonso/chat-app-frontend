import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'

import { useAppDrawer } from './useAppDrawer'
import { AppSearchBar } from '../AppSearchBar'

export const AppDrawer = () => {
  const {
    userList,
    anchorElNav,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleAccessChat
  } = useAppDrawer()

  return (
    <>
      <IconButton
        onClick={handleOpenNavMenu}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <SearchIcon />
      </IconButton>
      <Drawer anchor="left" open={!!anchorElNav} onClose={handleCloseNavMenu}>
        <ListItem>
          <AppSearchBar />
        </ListItem>
        <Divider />
        <Box
          sx={{ width: 300 }}
          role="presentation"
          onClick={handleCloseNavMenu}
          onKeyDown={handleCloseNavMenu}
        >
          <List>
            {userList.map(({ _id, name, email, profileImage }) => (
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
      </Drawer>
    </>
  )
}
