import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'

import { logout as logoutAction } from '../../../slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { Options } from '../Menu'

export const AvatarButton = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const logout = () => dispatch(logoutAction())

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <Tooltip title="Mais Opções">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.name} src={user?.profileImage} />
        </IconButton>
      </Tooltip>
      <Options
        anchorElUser={anchorElUser}
        logout={logout}
        handleCloseUserMenu={handleCloseUserMenu}
      />
    </>
  )
}
