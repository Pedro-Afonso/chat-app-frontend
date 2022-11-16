import SearchIcon from '@mui/icons-material/Search'
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

interface IAppNavBarProps {
  setAnchorElNav: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  anchorElUser: null | HTMLElement
  setAnchorElUser: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

export const AppNavBar: React.FC<IAppNavBarProps> = ({
  setAnchorElNav,
  anchorElUser,
  setAnchorElUser
}) => {
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
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
      {['Meu Perfil', 'Sair'].map(page => (
        <MenuItem key={page} onClick={handleCloseUserMenu}>
          <Typography textAlign="center">{page}</Typography>
        </MenuItem>
      ))}
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
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
