import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

import { INotification } from '../../../../slices/notificationSlice'

interface INotificationsProps {
  anchorElNotification: null | HTMLElement
  handleCloseNotificationMenu: () => void
  notifications: INotification[]
  handleClickNotification: (chatId: string) => () => void
}

export const Notifications: React.FC<INotificationsProps> = ({
  anchorElNotification,
  handleCloseNotificationMenu,
  notifications,
  handleClickNotification
}) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorElNotification}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={Boolean(anchorElNotification)}
      onClose={handleCloseNotificationMenu}
    >
      {notifications.map(({ name, messageId, chatId }) => (
        <MenuItem key={messageId} onClick={handleClickNotification(chatId)}>
          <Typography textAlign="center">
            Você tem novas mensagens em {name}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  )
}
