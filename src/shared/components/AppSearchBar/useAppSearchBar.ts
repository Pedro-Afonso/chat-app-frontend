import { useState, useEffect } from 'react'

import { useAppDispatch, useDebounce } from '../../hooks'
import { searchUsers } from '../../slices/userSlice'

export const useAppSearchBar = () => {
  const dispatch = useAppDispatch()

  const [query, setQuery] = useState('')

  const { debounce } = useDebounce()

  useEffect(() => {
    debounce(() => {
      dispatch(searchUsers(query))
    })
  }, [query, debounce, dispatch])

  return {
    query,
    setQuery
  }
}
