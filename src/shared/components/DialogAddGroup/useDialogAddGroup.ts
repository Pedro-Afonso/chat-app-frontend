import { useState } from 'react'

export const useAddDialogGroup = () => {
  const [modal, setModal] = useState(false)

  const handleCloseModal = () => {
    setModal(false)
  }

  const handleOpenModal = () => {
    setModal(true)
  }

  return {
    modal,
    handleCloseModal,
    handleOpenModal
  }
}
