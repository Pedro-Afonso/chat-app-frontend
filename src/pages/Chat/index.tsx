import { useEffect, useState } from 'react'

import {
  getCurrentUser,
  logout as logoutAction,
  searchUsers
} from '../../shared/slices/userSlice'
import { useAppDispatch, useAppSelector, useDebounce } from '../../shared/hooks'
import { AppDrawer } from '../../shared/components/AppDrawer'
import { AppNavBar } from '../../shared/components/AppNavBar'
import { AppSearchBar } from '../../shared/components'

export const Chat = () => {
  const dispatch = useAppDispatch()
  const { debounce } = useDebounce()
  const users = useAppSelector(state => state.user.users)

  const logout = () => dispatch(logoutAction())

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const [query, setQuery] = useState('')

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  useEffect(() => {
    debounce(() => {
      dispatch(searchUsers(query))
    })
  }, [query, debounce, dispatch])

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
        <AppSearchBar query={query} setQuery={setQuery} />
      </AppDrawer>
    </>
  )
}
