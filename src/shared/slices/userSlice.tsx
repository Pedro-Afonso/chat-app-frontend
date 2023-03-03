import { createSlice } from '@reduxjs/toolkit'

import { IAuthState } from '../interface'
import { userApiSlice } from '../services/userService'

const localUser = sessionStorage.getItem('user')

const initialState: IAuthState = {
  auth: localUser ? JSON.parse(localUser) : null,
  user: null,
  users: [],
  message: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => {
      sessionStorage.removeItem('user')
      return initialState
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        userApiSlice.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          if (!payload) {
            throw new Error('Payload is undefined')
          }
          sessionStorage.setItem('user', JSON.stringify(payload))
          state.auth = payload
        }
      )
      .addMatcher(
        userApiSlice.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          if (!payload) {
            throw new Error('Payload is undefined')
          }
          sessionStorage.setItem('user', JSON.stringify(payload))
          state.auth = payload
        }
      )
  }
})

export const { reset } = userSlice.actions
export const { reducer: userReducer } = userSlice
