import { Box } from '@mui/material'
import { LoginForm } from '../../shared/components/LoginForm'
import { RegisterForm } from '../../shared/components/RegisterForm'
import { FullWidthTabs } from '../../shared/components'

interface IFormProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const Home = () => {
  const handleLogin = (data: Omit<IFormProps, 'name' | 'confirmPassword'>) => {
    console.log(data)
  }

  const handleRegister = (data: IFormProps) => {
    console.log(data)
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
