import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MailIcon from '@mui/icons-material/Mail'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'

import {
  INotification,
  removeNotification
} from '../../slices/notificationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectChat } from '../../slices/chatSlice'

interface IRenderMenuProps {
  anchorElNot: null | HTMLElement
  handleCloseNotMenu: () => void
  notifications: INotification[]
  handleClick: (chatId: string) => () => void
}

const RenderMenu: React.FC<IRenderMenuProps> = ({
  anchorElNot,
  handleCloseNotMenu,
  notifications,
  handleClick
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
      {notifications.map(({ name, messageId, chatId }) => (
        <MenuItem key={messageId} onClick={handleClick(chatId)}>
          <Typography textAlign="center">
            Você tem novas mensagens em {name}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  )
}

export const Notifications = () => {
  const [anchorElNot, setAnchorElNot] = useState<null | HTMLElement>(null)

  const dispatch = useAppDispatch()

  const notifications = useAppSelector(
    state => state.notification.notifications
  )

  const handleClick = (chatId: string) => {
    return () => {
      dispatch(removeNotification({ chatId }))
      dispatch(selectChat(chatId))
      handleCloseNotMenu()
    }
  }

  const handleCloseNotMenu = () => {
    setAnchorElNot(null)
  }
  const handleOpenNotMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNot(e.currentTarget)
  }

  return (
    <>
      <Tooltip title="Notificações">
        <span>
          <IconButton
            size="large"
            color="inherit"
            disabled={notifications.length === 0}
            onClick={handleOpenNotMenu}
          >
            <Badge badgeContent={notifications.length} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
        </span>
      </Tooltip>
      <RenderMenu
        anchorElNot={anchorElNot}
        handleCloseNotMenu={handleCloseNotMenu}
        notifications={notifications}
        handleClick={handleClick}
      />
    </>
  )
}
