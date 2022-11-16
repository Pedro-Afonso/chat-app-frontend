export type TAuth = { _id: string; token: string }
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

//  Requests
export interface IRegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface ILoginForm {
  email: string
  password: string
}

// Responses
export type TAuthRes = TAuth | TErrors
export type TCurrentUserRes = TUser | TErrors
export type TSearchRes = TUser[] | TErrors

// Redux State
export interface IAuthState {
  auth: TAuth | null
  user: TUser | null
  users: TUser[]
  error: string | null
  success: boolean
  loading: boolean
}
