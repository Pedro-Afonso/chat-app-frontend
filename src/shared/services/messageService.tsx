import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Environment } from '../environment'
import { RootState } from '../store'
import { TMessage } from '../types'

export const messageApiSlice = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Environment.messagesBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.auth?.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),

  endpoints: builder => ({
    sendMessage: builder.mutation<any, { chatId: string; content: string }>({
      query: body => ({ url: '/', method: 'POST', body })
    }),
    getAllMessages: builder.query<
      { chatMessages: TMessage[]; message: string },
      { chatId?: string }
    >({
      query: ({ chatId }) => `chat/${chatId}`
    })
  })
})

export const { useSendMessageMutation, useGetAllMessagesQuery } =
  messageApiSlice
