import { useState } from 'react'
import { useAppSelector } from '../../../hooks'

export const useDialogUserDetails = () => {
  const [modal, setModal] = useState(false)

  const authUser = useAppSelector(state => state.user.user)
  const chat = useAppSelector(state => state.chat.chat)

  const contact =
    chat && authUser && chat.users.filter(user => user._id !== authUser._id)[0]

  const handleOpenUserDetails = () => {
    setModal(true)
  }
  const handleCloseModal = () => {
    setModal(false)
  }

  return {
    modal,

    contact,
    handleOpenUserDetails,
    handleCloseModal
  }
}
