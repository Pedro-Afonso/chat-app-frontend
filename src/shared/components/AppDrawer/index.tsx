import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'

import { AppSearchBar } from '../AppSearchBar'

/* const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElNav(event.currentTarget)
} */
interface userProps {
  name: string
  email: string
  profileImage?: string
}

interface IAppDrawerProps {
  anchorElNav: null | HTMLElement
  setAnchorElNav: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  userList: userProps[]
}

export const AppDrawer: React.FC<IAppDrawerProps> = ({
  anchorElNav,
  setAnchorElNav,
  userList
}) => {
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
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
          {userList.map(({ name, email, profileImage }) => (
            <ListItem key={name + email} disablePadding>
              <ListItemButton>
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
  )
}
