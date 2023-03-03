import { TSendMessageRes, TAllMessageRes } from '../interface/IMessage'
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

// Get all message by chat id
const getAllMessages = (token: string, chatId: string) => {
  return tryCatchService(async () => {
    const config = {
      headers: {
        Authorization: `Basic ${token}`
      }
    }

    const { data } = await Api.get<TAllMessageRes>(
      `/api/messages/chat/${chatId}`,

      config
    )

    return data
  })
}

export const messageService = { sendMessage, getAllMessages }
