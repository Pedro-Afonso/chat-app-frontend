import { useState } from 'react'
import { logout as logoutAction } from '../../slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

export const useAppNavBar = () => {
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

  return {
    user,
    logout,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu
  }
}
