import { Menu, MenuItem, Typography } from '@mui/material'
import { useMenuContext } from '../../../../hooks'
import { useLogout } from '../../../../hooks/useLogout'

export const UserOptionsMenu = () => {
  const { logout } = useLogout()

  const {
    menu: { isUserOptionsOpen, anchorElement },
    toogleIsUserOptionsOpen
  } = useMenuContext()

  const handleCloseUserMenu = () => {
    toogleIsUserOptionsOpen(null)
  }

  const handleLogout = () => {
    logout()
    toogleIsUserOptionsOpen(null)
  }

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={isUserOptionsOpen}
      onClose={handleCloseUserMenu}
    >
      <MenuItem onClick={handleLogout}>
        <Typography textAlign="center">Sair</Typography>
      </MenuItem>
    </Menu>
  )
}
