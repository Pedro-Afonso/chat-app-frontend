import { useState } from 'react'
import { AppDrawer } from '../../shared/components/AppDrawer'
import { AppNavBar } from '../../shared/components/AppNavBar'
import { useAppDispatch } from '../../shared/hooks'
import { logout as logoutAction } from '../../shared/slices/userSlice'

export const Chat = () => {
  const dispatch = useAppDispatch()

  const logout = () => dispatch(logoutAction())

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const userList = [
    { name: 'José', email: 'jose@email.com' },
    { name: 'Maria', email: 'maria@email.com' },
    { name: 'Joao', email: 'joao@email.com' }
  ]
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
        userList={userList}
      />
    </>
  )
}
