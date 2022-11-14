import { createTheme, ThemeProvider, Box, CssBaseline } from '@mui/material'
import { cyan, yellow } from '@mui/material/colors'

interface IAppThemeProviderProps {
  children: React.ReactNode
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: '#ffffff'
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff'
    },
    background: {
      paper: '#303134',
      default: '#0F0F0F'
    }
  },
  typography: {
    allVariants: {
      color: 'white'
    }
  }
})

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({
  children
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box minHeight="100vh" bgcolor={theme.palette.background.default}>
        {children}
      </Box>
    </ThemeProvider>
  )
}
