import IconButton from '@mui/material/IconButton'
import MailIcon from '@mui/icons-material/Mail'
import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'

import { Notifications } from '../Menu'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectChat } from '../../../slices/chatSlice'

export const NotificationButton = () => {
  const [anchorElNotification, setAnchorElNotification] =
    useState<null | HTMLElement>(null)

  const dispatch = useAppDispatch()

  const notifications = useAppSelector(
    state => state.notification.notifications
  )

  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null)
  }

  const handleOpenNotificationMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotification(e.currentTarget)
  }

  const handleClickNotification = (chatId: string) => {
    return () => {
      dispatch(selectChat(chatId))
      handleCloseNotificationMenu()
    }
  }

  return (
    <>
      <Tooltip title="Notificações">
        <span>
          <IconButton
            size="large"
            color="inherit"
            disabled={notifications.length === 0}
            onClick={handleOpenNotificationMenu}
          >
            <Badge badgeContent={notifications.length} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
        </span>
      </Tooltip>
      <Notifications
        notifications={notifications}
        anchorElNotification={anchorElNotification}
        handleClickNotification={handleClickNotification}
        handleCloseNotificationMenu={handleCloseNotificationMenu}
      />
    </>
  )
}
