import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppSocketProvider } from './shared/contexts/SocketContext'
import { AppThemeProvider } from './shared/contexts/ThemeContext'
import { AppMenuProvider } from './shared/contexts/MenuContext'

import { AppRoutes } from './routes'
import { store2 } from './shared/store/index2'

export const App = () => {
  return (
    <Provider store={store2}>
      <AppSocketProvider>
        <AppThemeProvider>
          <AppMenuProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AppMenuProvider>
        </AppThemeProvider>
      </AppSocketProvider>
      {/* <AppSnackBar /> */}
    </Provider>
  )
}
