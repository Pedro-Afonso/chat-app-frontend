import { useContext } from 'react'

import { SocketContext } from '../contexts/SocketContext'

export const useSocket = () => {
  const socket = useContext(SocketContext)

  return socket
}
