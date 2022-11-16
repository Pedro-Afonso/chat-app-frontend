import { useEffect, useState } from 'react'

import {
  getCurrentUser,
  logout as logoutAction
} from '../../shared/slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { AppDrawer } from '../../shared/components/AppDrawer'
import { AppNavBar } from '../../shared/components/AppNavBar'
import { AppSearchBar } from '../../shared/components'

export const Chat = () => {
  const dispatch = useAppDispatch()

  const users = useAppSelector(state => state.user.users)

  const logout = () => dispatch(logoutAction())

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  return (
    <>
      <AppNavBar
        setAnchorElNav={setAnchorElNav}
        anchorElUser={anchorElUser}
        setAnchorElUser={setAnchorElUser}
        logout={logout}
      />
      <AppDrawer
        setAnchorElNav={setAnchorElNav}
        anchorElNav={anchorElNav}
        userList={users}
      >
        <AppSearchBar />
      </AppDrawer>
    </>
  )
}
