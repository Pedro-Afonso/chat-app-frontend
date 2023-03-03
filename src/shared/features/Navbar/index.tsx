/* eslint-disable @typescript-eslint/no-empty-function */
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'

import SearchIcon from '@mui/icons-material/Search'
import MailIcon from '@mui/icons-material/Mail'
import { useAppDispatch } from '../../store/index2'
import { toogleIsDrawerOpen } from '../../slices/potalSlice'
import { useMenuContext } from '../../hooks/useMenuContext'
import { UserOptionsMenu } from './components'

const AvatarButton = () => {
  const { toogleIsUserOptionsOpen } = useMenuContext()

  const handleOpenUserOptionsMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    toogleIsUserOptionsOpen(e.currentTarget)
  }

  return (
    <Tooltip title="Mais Opções">
      <IconButton onClick={handleOpenUserOptionsMenu} sx={{ p: 0 }}>
        <Avatar /* alt={user?.name} src={user?.profileImage} */ />
      </IconButton>
    </Tooltip>
  )
}

export const Navbar = () => {
  const dispatch = useAppDispatch()

  // const { toogleIsUserOptionsOpen } = useMenuContext()

  // const handleOpenUserOptionsMenu = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   toogleIsUserOptionsOpen(e.currentTarget)
  // }

  const handleOpenDrawer = () => {
    dispatch(toogleIsDrawerOpen())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              onClick={handleOpenDrawer}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="center" flexGrow={1}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem'
              }}
            >
              REAL-TIME-CHAT
            </Typography>
          </Box>
          <Box display="flex" justifyContent="end" flexGrow={1} gap={1}>
            <Tooltip title="Notificações">
              <span>
                <IconButton
                  size="large"
                  color="inherit"
                  // disabled={notifications.length === 0}
                  // onClick={handleOpenNotificationMenu}
                >
                  <Badge badgeContent={2} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </span>
            </Tooltip>
            <AvatarButton />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menu */}
      <UserOptionsMenu />
    </Box>
  )
}
