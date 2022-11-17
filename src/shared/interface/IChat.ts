import { TErrors, TUser } from './IAuth'

type TMessage = {
  _id: string
  sender: TUser
  content: string
  chat: string
  readBy: string[]
  createdAt: Date
  updatedAt: Date
  __v: number
}

type TpreChat = {
  _id: string
  name: string
  groupAdmin?: TUser
  latestMessage?: TMessage
  createdAt: Date
  updatedAt: Date
  __v: number
}

export type TChat =
  | (TpreChat & { isGroupChat: true; users: string })
  | (TpreChat & { isGroupChat: false; users: TUser[] })

// Responses
export type TGetAllChatsByUserRes = TChat[] | TErrors

// Redux State
export interface IChatState {
  chats: TChat[]
  chat: TChat | null
  error: string | null
  success: boolean
  loading: boolean
}
