import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { accessChat } from '../../../slices/chatSlice'

export const useAppDrawer = () => {
  const dispatch = useAppDispatch()
  const userList = useAppSelector(state => state.user.users)

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleAccessChat = (userId: string) => {
    dispatch(accessChat({ userId }))
  }

  return {
    userList,
    anchorElNav,
    handleOpenNavMenu,
    handleCloseNavMenu,
    handleAccessChat
  }
}
