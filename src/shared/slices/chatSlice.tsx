import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IChatState } from '../interface'
import { chatApiSlice } from '../services'

const initialState: IChatState = {
  chats: [],
  chat: null,
  error: null,
  success: false,
  loading: false,
  message: null
}

/* // Fetch all users chat
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
  'chat/renamegroup',
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

// Create or fetch one to one chat
export const accessChat = createAsyncThunk<
  { chat: TChat; message: string },
  { userId: string },
  { rejectValue: string }
>('chat/accesschat', async ({ userId }, { rejectWithValue, getState }) => {
  const { user } = getState() as { user: IAuthState }

  const res = await chatService.accessChat(user.auth?.token || '', userId)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
}) */

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: () => initialState,
    clearChatMessage: state => {
      state.message = null
    },
    clearChatError: state => {
      state.error = null
    },
    setChatError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    selectChat: (state, action: PayloadAction<string>) => {
      state.chat = state.chats.filter(chat => chat._id === action.payload)[0]
    },
    removeChat: state => {
      state.chat = null
    }
  },
  extraReducers: builder => {
    builder
      /*
      .addCase(getAllChatsByUser.pending, state => {
        state.chats = []
        state.error = null
        state.success = false
        state.loading = true
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
        state.loading = true
        state.message = null
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.chats.unshift(action.payload.chat)
        state.chat = action.payload.chat
        state.loading = false
        state.success = true
        state.message = action.payload.message
      })
      .addCase(createGroupChat.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
      .addCase(addToGroup.pending, state => {
        state.error = null
        state.success = false
        state.loading = true
        state.message = null
      })
      .addCase(addToGroup.fulfilled, (state, action) => {
        const newChatList = state.chats.map(chat =>
          chat._id !== action.payload.chat._id ? chat : action.payload.chat
        )
        state.chats = newChatList
        state.chat = action.payload.chat
        state.loading = false
        state.success = true
        state.message = action.payload.message
      })
      .addCase(addToGroup.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
      .addCase(removeUser.pending, state => {
        state.error = null
        state.success = false
        state.loading = true
        state.message = null
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        const newChatList = state.chats.map(chat =>
          chat._id !== action.payload.chat._id ? chat : action.payload.chat
        )
        state.chats = newChatList
        state.chat = action.payload.chat
        state.loading = false
        state.success = true
        state.message = action.payload.message
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
      .addCase(renameGroup.pending, state => {
        state.error = null
        state.success = false
        state.loading = true
        state.message = null
      })
      .addCase(renameGroup.fulfilled, (state, action) => {
        const newChatList = state.chats.map(chat =>
          chat._id !== action.payload.chat._id ? chat : action.payload.chat
        )
        state.chats = newChatList
        state.chat = action.payload.chat
        state.loading = false
        state.success = true
        state.message = action.payload.message
      })
      .addCase(renameGroup.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
      .addCase(accessChat.pending, state => {
        state.error = null
        state.success = false
        state.loading = true
        state.message = null
      })
      .addCase(accessChat.fulfilled, (state, action) => {
        const newChatList = state.chats.filter(
          chat => chat._id === action.payload.chat._id
        )
        if (newChatList.length === 0) {
          state.chats.unshift(action.payload.chat)
        }
        state.chat = action.payload.chat
        state.loading = false
        state.success = true
        state.message = action.payload.message
      })
      .addCase(accessChat.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
  } */
      .addMatcher(
        chatApiSlice.endpoints.accessChat.matchFulfilled,
        (state, { payload }) => {
          if (!payload) {
            throw new Error('Payload is undefined')
          }
          state.chat = payload.chat
        }
      )
      .addMatcher(
        chatApiSlice.endpoints.getAllChatsByUser.matchFulfilled,
        (state, { payload }) => {
          if (!payload) {
            throw new Error('Payload is undefined')
          }
          state.chats = payload
        }
      )
  }
})

export const {
  reset,
  selectChat,
  removeChat,
  clearChatMessage,
  clearChatError,
  setChatError
} = chatSlice.actions

export const { reducer: chatReducer } = chatSlice
