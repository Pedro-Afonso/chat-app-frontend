import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { IChatState, IAuthState, TChat } from '../interface'
import { chatService } from '../services'

const initialState: IChatState = {
  chats: [],
  chat: null,
  error: null,
  success: false,
  loading: false
}

// Register a user and sign in
export const getAllChatsByUser = createAsyncThunk<
  TChat[],
  void,
  { rejectValue: string }
>('chat/getallchatsbyuser', async (_, { rejectWithValue, getState }) => {
  const { user } = getState() as { user: IAuthState }

  const res = await chatService.getAllChatsByUser(user.auth?.token || '')

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(getAllChatsByUser.pending, state => {
        state.chats = []
        state.error = null
        state.success = false
        state.loading = false
      })
      .addCase(getAllChatsByUser.fulfilled, (state, action) => {
        state.chats = action.payload
        state.loading = false
        state.success = true
      })
      .addCase(getAllChatsByUser.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
  }
})

export const { reset } = chatSlice.actions
export const { reducer: chatReducer } = chatSlice
