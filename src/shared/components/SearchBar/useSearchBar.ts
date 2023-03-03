import { useState, useEffect } from 'react'

import { useDebounce } from '../../hooks'

export const useSearchBar = ({ triggerSearch }: any) => {
  const [query, setQuery] = useState('')

  const { debounce } = useDebounce()

  useEffect(() => {
    debounce(() => {
      triggerSearch({ query })
    })
  }, [query, debounce, triggerSearch])

  return {
    query,
    setQuery
  }
}
