import { TErrors, TUser } from './IAuth'
import { TChat } from './IChat'

export type TMessage = {
  _id: string
  sender: TUser
  content: string
  chat: TChat
  readBy: string[]
  createdAt: Date
  updatedAt: Date
  __v?: number
}

// Responses
export type TSendMessageRes =
  | { chatMessage: TMessage; message: string }
  | TErrors

export type TAllMessageRes =
  | { chatMessages: TMessage[]; message: string }
  | TErrors

// Redux State
export interface IMessageState {
  chatMessage: TMessage | null
  chatMessages: TMessage[]
  error: string | null
  success: boolean
  loading: boolean
  message: string | null
}
