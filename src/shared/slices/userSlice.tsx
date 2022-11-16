import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  IRegisterForm,
  TAuth,
  IAuthState,
  ILoginForm,
  TUser
} from '../interface'
import { userService } from '../services/userService'

const localUser = sessionStorage.getItem('user')
const auth: TAuth | null = localUser ? JSON.parse(localUser) : null

const initialState: IAuthState = {
  auth,
  user: null,
  error: null,
  success: false,
  loading: false
}

// Register a user and sign in
export const register = createAsyncThunk<
  TAuth,
  IRegisterForm,
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
    logout: state => {
      state.auth = null
      state.user = null
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
        state.loading = false
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
        state.loading = false
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
        state.loading = false
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
  }
})

export const { reset, logout } = userSlice.actions
export const { reducer: userReducer } = userSlice
