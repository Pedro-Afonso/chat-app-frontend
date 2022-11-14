export type TAuth = { _id: string; token: string }
export type TErrors = { errors: string[] }

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

// Redux State
export interface IAuthState {
  user: TAuth | null
  error: string | null
  success: boolean
  loading: boolean
}
