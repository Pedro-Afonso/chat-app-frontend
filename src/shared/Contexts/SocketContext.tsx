/* eslint-disable no-console */
import { createContext } from 'react'
import io, { Socket } from 'socket.io-client'

export const socket = io('http://localhost:5000')

export const SocketContext = createContext(socket as Socket)
interface IAppSocketProviderProps {
  children: React.ReactNode
}

export const AppSocketProvider: React.FC<IAppSocketProviderProps> = ({
  children
}) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
