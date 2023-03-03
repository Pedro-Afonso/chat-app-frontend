import { Backdrop, Box, CircularProgress } from '@mui/material'

import {
  FullWidthTabs,
  FloatSquaresAnimation,
  RegisterForm,
  LoginForm
} from '../../shared/components'

import {
  useLoginMutation,
  useRegisterMutation
} from '../../shared/services/userService'

interface IFormProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const BackdropHome = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
      open={false}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export const Home = () => {
  const [login] = useLoginMutation()
  const [register] = useRegisterMutation()

  const handleLogin = (data: Omit<IFormProps, 'name' | 'confirmPassword'>) => {
    login(data)
  }

  const handleRegister = (data: FormData) => {
    register({ user: data })
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
