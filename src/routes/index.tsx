import { Navigate, Route, Routes } from 'react-router-dom'

import { useAppSelector } from '../shared/hooks'
import { Home, Chat } from '../pages'

export const AppRoutes = () => {
  const auth = useAppSelector(state => state.user.auth)

  return (
    <Routes>
      <Route path="/home" element={auth ? <Navigate to="/chat" /> : <Home />} />
      <Route path="/chat" element={auth ? <Chat /> : <Navigate to="/home" />} />

      <Route path="*" element={!auth ? <Home /> : <Navigate to="/chat" />} />
    </Routes>
  )
}
