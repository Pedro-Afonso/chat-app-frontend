import { TErrors, TUser } from './IAuth'
import { TMessage } from './IMessage'

export type TChat = {
  _id: string
  name: string
  isGroupChat: boolean
  groupAdmin?: TUser
  users: TUser[]
  latestMessage?: TMessage
  createdAt: Date
  updatedAt: Date
  __v: number
}

// Responses
export type TGetAllChatsByUserRes = TChat[] | TErrors
export type TCreateGroupChatRes = { chat: TChat; message: string } | TErrors

// Redux State
export interface IChatState {
  chats: TChat[]
  chat: TChat | null
  error: string | null
  success: boolean
  loading: boolean
}
