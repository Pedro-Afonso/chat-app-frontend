import { useState } from 'react'

import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MailIcon from '@mui/icons-material/Mail'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'

import { logout as logoutAction } from '../../slices/userSlice'
import { useAppDispatch } from '../../hooks'
import { AppDrawer } from '../../components'

export const AppNavBar = () => {
  const dispatch = useAppDispatch()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const logout = () => dispatch(logoutAction())

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography textAlign="center">Meu Perfil</Typography>
      </MenuItem>
      <MenuItem onClick={logout}>
        <Typography textAlign="center">Sair</Typography>
      </MenuItem>
    </Menu>
  )

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
              LOGO
            </Typography>
          </Box>

          <Box display="flex" justifyContent="end" flexGrow={1} gap={1}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Mais Opções">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Re" src="/" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  )
}
