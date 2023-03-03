import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDrawerOpen: false,
  isGroupDetailsModalOpen: false,
  isUserDetailsModalOpen: false,
  isAddGroupModalOpen: false
}

export const portalSlice = createSlice({
  name: 'portal',
  initialState,
  reducers: {
    toogleIsDrawerOpen: state => {
      state.isDrawerOpen = !state.isDrawerOpen
    },
    toogleIsGroupDetailsModalOpen: state => {
      state.isGroupDetailsModalOpen = !state.isGroupDetailsModalOpen
    },
    toogleIsUserDetailsModalOpen: state => {
      state.isUserDetailsModalOpen = !state.isUserDetailsModalOpen
    },
    toogleIsAddGroupModalOpen: state => {
      state.isAddGroupModalOpen = !state.isAddGroupModalOpen
    }
  }
})

export const {
  toogleIsDrawerOpen,
  toogleIsGroupDetailsModalOpen,
  toogleIsUserDetailsModalOpen,
  toogleIsAddGroupModalOpen
} = portalSlice.actions

export const { reducer: portalReducer } = portalSlice
