import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'

import { Notifications } from '../Notifications'
import { useAppNavBar } from './useAppNavBar'
import { AppDrawer } from './AppDrawer'
import { Options } from './Menu'

export const AppNavBar = () => {
  const {
    user,
    logout,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu
  } = useAppNavBar()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <AppDrawer />
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
            <Notifications />
            <Tooltip title="Mais Opções">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name} src={user?.profileImage} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Options
        anchorElUser={anchorElUser}
        logout={logout}
        handleCloseUserMenu={handleCloseUserMenu}
      />
    </Box>
  )
}
