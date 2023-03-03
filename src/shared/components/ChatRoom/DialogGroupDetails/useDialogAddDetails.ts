import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'

export const useDialogAddDetails = () => {
  const [groupName, setGroupName] = useState('')
  const [modal, setModal] = useState(false)
  const dispatch = useAppDispatch()
  const chat = useAppSelector(state => state.chat.chat)
  const memberList = useAppSelector(state =>
    state.chat.chat ? state.chat.chat.users : []
  )

  const adminId = chat && chat.groupAdmin ? chat.groupAdmin._id : ''
  const chatId = chat ? chat._id : ''
  useEffect(() => {
    if (!chat) return
    setGroupName(chat.name)
  }, [chat])

  const handleOpenGroupDetails = () => {
    setModal(true)
  }
  const handleCloseModal = () => {
    setModal(false)
  }

  const handleRenameGroup = () => {
    if (!chatId || !groupName) return
    dispatch(renameGroup({ chatId, newChatName: groupName }))
  }

  const handleLeaveGroup = () => {
    alert('Você saiu do grupo')
  }

  const handleRemoveUser = (userId: string) => {
    if (adminId === userId) return
    dispatch(removeUser({ userId, chatId }))
  }

  return {
    groupName,
    setGroupName,
    modal,
    chatId,
    memberList,
    handleOpenGroupDetails,
    handleCloseModal,
    handleRenameGroup,
    handleLeaveGroup,
    handleRemoveUser
  }
}
