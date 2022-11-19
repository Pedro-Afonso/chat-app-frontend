import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { TMessage, IAuthState, IMessageState } from '../interface'
import { messageService } from '../services'

const initialState: IMessageState = {
  chatMessage: null,
  chatMessages: [],
  error: null,
  success: false,
  loading: false
}

// Fetch all users chat
export const sendMessage = createAsyncThunk<
  { chatMessage: TMessage; message: string },
  { content: string; chatId: string },
  { rejectValue: string }
>(
  'message/sendMessage',
  async ({ content, chatId }, { rejectWithValue, getState }) => {
    const { user } = getState() as { user: IAuthState }

    const res = await messageService.sendMessage(
      user.auth?.token || '',
      chatId,
      content
    )

    // Check for errors
    if ('errors' in res) {
      return rejectWithValue(res.errors[0])
    }

    return res
  }
)

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(sendMessage.pending, state => {
        state.error = null
        state.success = false
        state.loading = false
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.chatMessages.unshift(action.payload.chatMessage)
        state.loading = false
        state.success = true
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
  }
})

export const { reducer: messageReducer } = messageSlice
