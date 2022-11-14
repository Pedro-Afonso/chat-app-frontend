import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { VTextField } from '../Forms'

interface IFormProps {
  email: string
  password: string
}

interface ILoginFormProps {
  handleLogin: (data: IFormProps) => void
}

export const LoginForm: React.FC<ILoginFormProps> = ({ handleLogin }) => {
  const { handleSubmit, control } = useForm<IFormProps>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: IFormProps) => {
    handleLogin(data)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <VTextField
        name="email"
        label="email"
        type="email"
        placeholder="Insira o email cadastrado..."
        control={control}
      />
      <VTextField
        name="password"
        label="senha"
        type="password"
        placeholder="Insira sua senha"
        control={control}
      />
      <Button type="submit" variant="contained">
        Entrar
      </Button>
      <Button variant="contained" color="error">
        Usar as credenciais de um convidado
      </Button>
    </Box>
  )
}
