import { useContext } from 'react'

import { SocketContext } from '../Contexts/SocketContext'

export const useSocket = () => {
  const socket = useContext(SocketContext)

  return socket
}
