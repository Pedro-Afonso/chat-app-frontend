import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Environment } from '../environment'
import { RootState } from '../store'
import { TLoginForm, TUser } from '../types'

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Environment.usersBaseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).user.auth?.token

      if (endpoint === ('register' || 'login')) {
        return headers
      }

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: builder => ({
    register: builder.mutation<any, { user: FormData }>({
      query: ({ user }) => ({ url: '/', method: 'POST', body: user })
    }),
    login: builder.mutation<any, TLoginForm>({
      query: body => ({ url: '/login', method: 'POST', body })
    }),
    getCurrentUser: builder.query<TUser, void>({
      query: () => '/'
    }),
    searchUsers: builder.query<TUser[], { query?: string }>({
      query: ({ query }) => `search?q=${query}`
    })
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetCurrentUserQuery,
  useSearchUsersQuery,
  useLazySearchUsersQuery
} = userApiSlice
