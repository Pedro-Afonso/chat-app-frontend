import { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../../hooks'

export const useAddGroupForm = (closeModal: () => void) => {
  const dispatch = useAppDispatch()

  const [groupName, setGroupName] = useState('')
  const [addData, setAddData] = useState<{ id: string; name: string }[]>([])

  const userList = useAppSelector(state => state.user.users)

  const handleCreateGroup = () => {
    if (!groupName || addData.length < 2) return

    dispatch(
      createGroupChat({
        name: groupName,
        users: addData.map(data => data.id)
      })
    )

    setGroupName('')
    closeModal()
    setAddData([])
  }

  return {
    setGroupName,
    setAddData,
    groupName,
    addData,
    userList,
    handleCreateGroup
  }
}
