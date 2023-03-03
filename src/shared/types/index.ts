/* eslint-disable no-use-before-define */
export type TErrors = { errors: string[] }

export type TUser = {
  _id: string
  name: string
  email: string
  profileImage?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
  __v?: number
}

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

//  Request
export type TLoginForm = {
  email: string
  password: string
}

//  Responses
export type TGetAllChatsByUserRes = TChat[] | TErrors
