import { TSendMessageRes } from '../interface/IMessage'
import { tryCatchService } from '../utils'
import { Api } from './api'

// Send message to chat
const sendMessage = (token: string, chatId: string, content: string) => {
  return tryCatchService(async () => {
    const postData = {
      content,
      chatId
    }

    const config = {
      headers: {
        Authorization: `Basic ${token}`
      }
    }

    const { data } = await Api.post<TSendMessageRes>(
      '/api/messages/',
      postData,
      config
    )

    return data
  })
}

export const messageService = { sendMessage }
