import { ILoginForm, TAuthRes, TCurrentUserRes, TSearchRes } from '../interface'
import { tryCatchService } from '../utils'
import { Api } from './api'

// Register a user and sign in
const register = async (user: FormData) => {
  return tryCatchService(async () => {
    const { data } = await Api.post<TAuthRes>('/api/users/', user)

    if ('token' in data) {
      sessionStorage.setItem('user', JSON.stringify(data))
    }
    return data
  })
}

// Login with email and password
const login = async (user: ILoginForm) => {
  return tryCatchService(async () => {
    const { data } = await Api.post<TAuthRes>('/api/users/login', user)

    if ('token' in data) {
      sessionStorage.setItem('user', JSON.stringify(data))
    }
    return data
  })
}

// Get the logged in user's profile information
const getCurrentUser = async (token: string) => {
  return tryCatchService(async () => {
    const { data } = await Api.get<TCurrentUserRes>('/api/users/', {
      headers: {
        Authorization: `Basic ${token}`
      }
    })

    return data
  })
}

// Search for users by name or email
const searchUsers = async (token: string, query: string) => {
  return tryCatchService(async () => {
    const { data } = await Api.get<TSearchRes>(`/api/users/search?q=${query}`, {
      headers: {
        Authorization: `Basic ${token}`
      }
    })

    return data
  })
}

export const userService = { register, login, getCurrentUser, searchUsers }
