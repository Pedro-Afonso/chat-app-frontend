import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { TAuth, IAuthState, ILoginForm, TUser } from '../interface'
import { userService } from '../services/userService'

const localUser = sessionStorage.getItem('user')
const auth: TAuth | null = localUser ? JSON.parse(localUser) : null

const initialState: IAuthState = {
  auth,
  user: null,
  users: [],
  error: null,
  success: false,
  loading: false,
  message: null
}

// Register a user and sign in
export const register = createAsyncThunk<
  TAuth,
  FormData,
  { rejectValue: string }
>('user/register', async (data, { rejectWithValue }) => {
  const res = await userService.register(data)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

// Login with email and password
export const login = createAsyncThunk<
  TAuth,
  ILoginForm,
  { rejectValue: string }
>('user/login', async (data, { rejectWithValue }) => {
  const res = await userService.login(data)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

// Get the logged in user's profile information
export const getCurrentUser = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string }
>('user/getcurrentuser', async (_, { rejectWithValue, getState }) => {
  const { user } = getState() as { user: IAuthState }

  const res = await userService.getCurrentUser(user.auth?.token || '')

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

// Search for users by name or email
export const searchUsers = createAsyncThunk<
  TUser[],
  string,
  { rejectValue: string }
>('user/searchusers', async (query, { rejectWithValue, getState }) => {
  const { user } = getState() as { user: IAuthState }

  if (query.trim() === '') return []

  const res = await userService.searchUsers(user.auth?.token || '', query)

  // Check for errors
  if ('errors' in res) {
    return rejectWithValue(res.errors[0])
  }

  return res
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
    clearUserError: state => {
      state.error = null
    },
    logout: state => {
      sessionStorage.removeItem('user')
      state.auth = null
      state.user = null
      state.users = []
      state.error = null
      state.loading = false
      state.success = false
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.auth = null
        state.user = null
        state.error = null
        state.loading = true
        state.success = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.auth = action.payload
        state.loading = false
        state.success = true
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
      .addCase(login.pending, state => {
        state.auth = null
        state.user = null
        state.error = null
        state.loading = true
        state.success = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.auth = action.payload
        state.loading = false
        state.success = true
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
      .addCase(getCurrentUser.pending, state => {
        state.user = null
        state.error = null
        state.loading = true
        state.success = false
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
        state.success = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
      .addCase(searchUsers.pending, state => {
        state.users = []
        state.error = null
        state.loading = true
        state.success = false
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.loading = false
        state.success = true
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.error = action.payload ? action.payload : null
        state.loading = false
      })
  }
})

export const { reset, logout, clearUserError } = userSlice.actions
export const { reducer: userReducer } = userSlice
