import {
  createTheme,
  ThemeProvider,
  Box,
  CssBaseline,
  experimental_sx as sx
} from '@mui/material'
import { cyan, yellow } from '@mui/material/colors'

interface IAppThemeProviderProps {
  children: React.ReactNode
}

const appScrollBar = {
  overflow: 'auto',
  maxHeight: '100%',
  '&::-webkit-scrollbar': {
    width: '3px'
  },

  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
    borderRadius: '10px'
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#fbc02d',
    borderRadius: '10px'
  },

  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgb(255, 251, 251)'
  }
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
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: sx(appScrollBar)
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: sx(appScrollBar)
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: sx(appScrollBar)
      }
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
