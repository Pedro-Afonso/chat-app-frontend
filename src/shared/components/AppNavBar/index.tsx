import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'

import { Notifications } from '../Notifications'
import { AvatarButton } from './AvatarButton'
import { AppDrawer } from './AppDrawer'

export const AppNavBar = () => {
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
              REAL-TIME-CHAT
            </Typography>
          </Box>
          <Box display="flex" justifyContent="end" flexGrow={1} gap={1}>
            <Notifications />
            <AvatarButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
