import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { socket } from '../Contexts/SocketContext'
import { TMessage, IAuthState, IMessageState } from '../interface'
import { messageService } from '../services'

const initialState: IMessageState = {
  chatMessage: null,
  chatMessages: [],
  error: null,
  success: false,
  loading: false,
  message: null
}

// Send message to chat
export const sendMessage = createAsyncThunk<
  { chatMessage: TMessage; message: string },
  { content: string; chatId: string },
  { rejectValue: string }
>(
  'message/sendmessage',
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
    socket.emit('new message', res.chatMessage)
    return res
  }
)

// Get all message by chat id
export const getAllMessages = createAsyncThunk<
  { chatMessages: TMessage[]; message: string },
  string,
  { rejectValue: string }
>('message/getallmessages', async (chatId, { rejectWithValue, getState }) => {
  const { user } = getState() as { user: IAuthState }

  const res = await messageService.getAllMessages(
    user.auth?.token || '',
    chatId
  )

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    reset: () => initialState,
    clearMessageError: state => {
      state.error = null
    },
    receivedMessage: (state, action: PayloadAction<TMessage>) => {
      state.chatMessages.unshift(action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(sendMessage.pending, state => {
        state.error = null
        state.success = false
        state.loading = true
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.chatMessages.unshift(action.payload.chatMessage)
        state.chatMessage = action.payload.chatMessage
        state.loading = false
        state.success = true
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
      .addCase(getAllMessages.pending, state => {
        state.error = null
        state.success = false
        state.loading = true
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.chatMessages = action.payload.chatMessages
        state.loading = false
        state.success = true
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
  }
})

export const { reset, receivedMessage, clearMessageError } =
  messageSlice.actions
export const { reducer: messageReducer } = messageSlice
