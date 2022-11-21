import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppSocketProvider } from './shared/Contexts/SocketContext'
import { AppThemeProvider } from './shared/Contexts/ThemeContext'
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
    </Provider>
  )
}
