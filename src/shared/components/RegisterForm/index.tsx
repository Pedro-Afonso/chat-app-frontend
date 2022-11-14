import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { VTextField } from '../Forms'

interface IFormProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface IRegisterFormProps {
  handleRegister: (data: IFormProps) => void
}

export const RegisterForm: React.FC<IRegisterFormProps> = ({
  handleRegister
}) => {
  const { handleSubmit, control } = useForm<IFormProps>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (data: IFormProps) => {
    handleRegister(data)
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
        name="name"
        label="nome"
        type="text"
        placeholder="Insira o email cadastrado..."
        control={control}
      />
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
      <VTextField
        name="confirmPassword"
        label="confirmação de senha"
        type="password"
        placeholder="Insira sua senha"
        control={control}
      />
      <Button type="submit" variant="contained">
        Cadastrar
      </Button>
    </Box>
  )
}
