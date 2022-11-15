import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './routes'
import { AppThemeProvider } from './shared/Contexts/ThemeContext'
import { store } from './shared/store'

export const App = () => {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppThemeProvider>
    </Provider>
  )
}
