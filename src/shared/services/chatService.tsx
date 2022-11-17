import { TGetAllChatsByUserRes } from '../interface'
import { tryCatchService } from '../utils'
import { Api } from './api'

const getAllChatsByUser = (token: string) => {
  return tryCatchService(async () => {
    const config = {
      headers: {
        Authorization: `Basic ${token}`
      }
    }
    const { data } = await Api.get<TGetAllChatsByUserRes>('/api/chats/', config)

    return data
  })
}

export const chatService = { getAllChatsByUser }
