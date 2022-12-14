import { MenuItem, Typography } from '@mui/material'
import Menu from '@mui/material/Menu'

interface IOptionsProps {
  anchorElUser: null | HTMLElement
  logout: () => void
  handleCloseUserMenu: () => void
}

export const Options: React.FC<IOptionsProps> = ({
  anchorElUser,
  logout,
  handleCloseUserMenu
}) => {
  return (
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
      <MenuItem onClick={logout}>
        <Typography textAlign="center">Sair</Typography>
      </MenuItem>
    </Menu>
  )
}
