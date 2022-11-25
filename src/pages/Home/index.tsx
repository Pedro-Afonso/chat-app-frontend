import { Backdrop, Box, CircularProgress } from '@mui/material'

import {
  FullWidthTabs,
  FloatSquaresAnimation,
  RegisterForm,
  LoginForm
} from '../../shared/components'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import { login, register } from '../../shared/slices/userSlice'

interface IFormProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const BackdropHome = () => {
  const userLoading = useAppSelector(state => state.user.loading)
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
      open={userLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export const Home = () => {
  const dispatch = useAppDispatch()

  const handleLogin = (data: Omit<IFormProps, 'name' | 'confirmPassword'>) => {
    dispatch(login(data))
  }

  const handleRegister = (data: FormData) => {
    dispatch(register(data))
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      position="relative"
    >
      <FullWidthTabs
        tabs={[
          {
            index: 0,
            label: 'Entrar',
            component: <LoginForm handleLogin={handleLogin} />
          },
          {
            index: 1,
            label: 'Cadastrar',
            component: <RegisterForm handleRegister={handleRegister} />
          }
        ]}
      />
      <BackdropHome />
      <FloatSquaresAnimation />
    </Box>
  )
}
