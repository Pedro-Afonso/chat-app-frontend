import IconButton from '@mui/material/IconButton'
import MailIcon from '@mui/icons-material/Mail'
import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'

import { INotification } from '../../../slices/notificationSlice'

interface INotificationButtonProps {
  notifications: INotification[]
  handleOpenNotMenu: () => void
}

export const NotificationButton: React.FC<INotificationButtonProps> = ({
  notifications,
  handleOpenNotMenu
}) => {
  return (
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
  )
}
