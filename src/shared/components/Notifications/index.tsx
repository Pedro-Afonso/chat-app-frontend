import { useState } from 'react'

import Typography from '@mui/material/Typography'
import MailIcon from '@mui/icons-material/Mail'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'

interface IRenderMenuProps {
  anchorElNot: null | HTMLElement
  handleCloseNotMenu: () => void
}

const RenderMenu: React.FC<IRenderMenuProps> = ({
  anchorElNot,
  handleCloseNotMenu
}) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNot}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={Boolean(anchorElNot)}
      onClose={handleCloseNotMenu}
    >
      <MenuItem onClick={handleCloseNotMenu}>
        <Typography textAlign="center">Em breve...</Typography>
      </MenuItem>
    </Menu>
  )
}

export const Notifications = () => {
  const [anchorElNot, setAnchorElNot] = useState<null | HTMLElement>(null)

  const handleCloseNotMenu = () => {
    setAnchorElNot(null)
  }
  const handleOpenNotMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNot(e.currentTarget)
  }

  return (
    <>
      <Tooltip title="Mais Opções">
        <IconButton size="large" color="inherit" onClick={handleOpenNotMenu}>
          <Badge badgeContent={0} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <RenderMenu
        anchorElNot={anchorElNot}
        handleCloseNotMenu={handleCloseNotMenu}
      />
    </>
  )
}
