import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

import { INotification } from '../../../../slices/notificationSlice'

interface INotificationsProps {
  anchorElNot: null | HTMLElement
  handleCloseNotMenu: () => void
  notifications: INotification[]
  handleClick: (chatId: string) => () => void
}

export const Notifications: React.FC<INotificationsProps> = ({
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
