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

// Fetch all users chat
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

// Create a new group chat
export const createGroupChat = createAsyncThunk<
  { chat: TChat; message: string },
  { name: string; users: string[] },
  { rejectValue: string }
>(
  'chat/creategroupchat',
  async ({ name, users }, { rejectWithValue, getState }) => {
    const { user } = getState() as { user: IAuthState }

    const res = await chatService.createGroupChat(
      user.auth?.token || '',
      name,
      users
    )

    // Check for errors
    if ('errors' in res) {
      return rejectWithValue(res.errors[0])
    }

    return res
  }
)

// Add user to chat
export const addToGroup = createAsyncThunk<
  { chat: TChat; message: string },
  { chatId: string; userId: string },
  { rejectValue: string }
>(
  'chat/addtogroup',
  async ({ chatId, userId }, { rejectWithValue, getState }) => {
    const { user } = getState() as { user: IAuthState }

    const res = await chatService.addToGroup(
      user.auth?.token || '',
      chatId,
      userId
    )

    // Check for errors
    if ('errors' in res) {
      return rejectWithValue(res.errors[0])
    }

    return res
  }
)

// Remove member from chat
export const removeUser = createAsyncThunk<
  { chat: TChat; message: string },
  { chatId: string; userId: string },
  { rejectValue: string }
>(
  'chat/removeuser',
  async ({ chatId, userId }, { rejectWithValue, getState }) => {
    const { user } = getState() as { user: IAuthState }

    const res = await chatService.removeUser(
      user.auth?.token || '',
      chatId,
      userId
    )

    // Check for errors
    if ('errors' in res) {
      return rejectWithValue(res.errors[0])
    }

    return res
  }
)

// Rename group chat
export const renameGroup = createAsyncThunk<
  { chat: TChat; message: string },
  { chatId: string; newChatName: string },
  { rejectValue: string }
>(
  'chat/renameGroup',
  async ({ chatId, newChatName }, { rejectWithValue, getState }) => {
    const { user } = getState() as { user: IAuthState }

    const res = await chatService.renameGroup(
      user.auth?.token || '',
      chatId,
      newChatName
    )

    // Check for errors
    if ('errors' in res) {
      return rejectWithValue(res.errors[0])
    }

    return res
  }
)

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
      .addCase(createGroupChat.pending, state => {
        state.error = null
        state.success = false
        state.loading = false
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.chats.unshift(action.payload.chat)
        state.chat = action.payload.chat
        state.loading = false
        state.success = true
      })
      .addCase(createGroupChat.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
      .addCase(addToGroup.pending, state => {
        state.error = null
        state.success = false
        state.loading = false
      })
      .addCase(addToGroup.fulfilled, (state, action) => {
        state.chat = action.payload.chat
        state.loading = false
        state.success = true
      })
      .addCase(addToGroup.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
      .addCase(removeUser.pending, state => {
        state.error = null
        state.success = false
        state.loading = false
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.chat = action.payload.chat
        state.loading = false
        state.success = true
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
      .addCase(renameGroup.pending, state => {
        state.error = null
        state.success = false
        state.loading = false
      })
      .addCase(renameGroup.fulfilled, (state, action) => {
        state.chat = action.payload.chat
        state.loading = false
        state.success = true
      })
      .addCase(renameGroup.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
  }
})

export const { reset } = chatSlice.actions
export const { reducer: chatReducer } = chatSlice
