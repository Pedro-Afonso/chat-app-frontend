import { Box } from '@mui/material'
import { LoginForm } from '../../shared/components/LoginForm'
import { RegisterForm } from '../../shared/components/RegisterForm'
import { FullWidthTabs } from '../../shared/components'
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
    <Box>
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
    </Box>
  )
}
