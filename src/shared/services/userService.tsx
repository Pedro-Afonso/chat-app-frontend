import { IRegisterForm, TAuthRes } from '../interface'
import { tryCatchService } from '../utils'
import { Api } from './api'

// Register a user and sign in
const register = async (user: IRegisterForm) => {
  return tryCatchService(async () => {
    const { data } = await Api.post<TAuthRes>('/api/users/', user)

    if ('token' in data) {
      sessionStorage.setItem('user', JSON.stringify(data))
    }
    return data
  })
}

export const userService = { register }
