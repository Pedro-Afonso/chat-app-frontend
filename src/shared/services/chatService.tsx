import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Environment } from '../environment'
import { RootState } from '../store'
import { TChat } from '../types'

export const chatApiSlice = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Environment.chatsBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.auth?.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),

  endpoints: builder => ({
    accessChat: builder.mutation<
      { chat: TChat; message: string },
      { userId: string }
    >({
      query: body => ({ url: '/', method: 'POST', body })
    }),
    getAllChatsByUser: builder.query<TChat[], void>({
      query: () => '/'
    }),
    createGroupChat: builder.mutation<
      { chat: TChat; message: string },
      { name: string; users: string[] }
    >({
      query: body => ({ url: '/group', method: 'POST', body })
    }),
    addToGroup: builder.mutation<
      { chat: TChat; message: string },
      { chatId: string; userId: string }
    >({
      query: ({ chatId, userId }) => ({
        url: `group/${chatId}/users/${userId}`,
        method: 'PUT'
      })
    }),
    removeUser: builder.mutation<
      { chat: TChat; message: string },
      { chatId: string; userId: string }
    >({
      query: ({ chatId, userId }) => ({
        url: `group/${chatId}/users/${userId}`,
        method: 'DELETE'
      })
    }),
    renameGroup: builder.mutation<
      { chat: TChat; message: string },
      { chatId: string; newChatName: string }
    >({
      query: ({ chatId, newChatName }) => ({
        url: `group/${chatId}}`,
        method: 'PUT',
        body: { newChatName }
      })
    })
  })
})

export const {
  useGetAllChatsByUserQuery,
  useCreateGroupChatMutation,
  useAddToGroupMutation,
  useRemoveUserMutation,
  useRenameGroupMutation,
  useAccessChatMutation
} = chatApiSlice
