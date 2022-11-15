import { Route, Routes } from 'react-router-dom'

import { useAppSelector } from '../shared/hooks'
import { Home, Chat } from '../pages'

export const AppRoutes = () => {
  const { auth } = useAppSelector(state => state.user)

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={auth ? <Chat /> : <Home />} />

      <Route path="*" element={<Home />} />
    </Routes>
  )
}
