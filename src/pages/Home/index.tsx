import { Box } from '@mui/material'

import {
  FullWidthTabs,
  FloatSquaresAnimation,
  RegisterForm,
  LoginForm
} from '../../shared/components'
import { useAppDispatch } from '../../shared/hooks'
import { login, register } from '../../shared/slices/userSlice'

interface IFormProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const Home = () => {
  const dispatch = useAppDispatch()

  const handleLogin = (data: Omit<IFormProps, 'name' | 'confirmPassword'>) => {
    dispatch(login(data))
  }

  const handleRegister = (data: IFormProps) => {
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
      <FloatSquaresAnimation />
    </Box>
  )
}
