import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppSocketProvider } from './shared/contexts/SocketContext'
import { AppThemeProvider } from './shared/contexts/ThemeContext'
import { AppSnackBar } from './shared/components'
import { store } from './shared/store'
import { AppRoutes } from './routes'

export const App = () => {
  return (
    <Provider store={store}>
      <AppSocketProvider>
        <AppThemeProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppThemeProvider>
      </AppSocketProvider>
      <AppSnackBar />
    </Provider>
  )
}
