import { TGetAllChatsByUserRes, TCreateGroupChatRes } from '../interface'
import { tryCatchService } from '../utils'
import { Api } from './api'

// Fetch all users chat
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

// Create a new group chat
const createGroupChat = (token: string, name: string, users: string[]) => {
  return tryCatchService(async () => {
    const postData = {
      name,
      users
    }

    const config = {
      headers: {
        Authorization: `Basic ${token}`
      }
    }

    const { data } = await Api.post<TCreateGroupChatRes>(
      '/api/chats/group/',
      postData,
      config
    )

    return data
  })
}

// Add user to chat
const addToGroup = (token: string, chatId: string, userId: string) => {
  return tryCatchService(async () => {
    const config = {
      headers: {
        Authorization: `Basic ${token}`
      }
    }

    const { data } = await Api.put<TCreateGroupChatRes>(
      `/api/chats/group/${chatId}/users/${userId}`,
      null,
      config
    )

    return data
  })
}

export const chatService = { getAllChatsByUser, createGroupChat, addToGroup }
