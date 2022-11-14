import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './routes'
import { AppThemeProvider } from './shared/Contexts/ThemeContext'

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  )
}
