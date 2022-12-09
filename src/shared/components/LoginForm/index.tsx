import { Avatar, Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { VTextField } from '../Forms'
import * as yup from 'yup'
import { useYupValidationResolver } from '../../hooks'

const formSchema = yup.object({
  email: yup
    .string()
    .email('Insira um email válido.')
    .required('O email é obrigatório.'),
  password: yup
    .string()
    .min(8, 'A senha precisa de no mínimo 8 caracteres.')
    .required('A senha é obrigatória')
})

type TForm = yup.InferType<typeof formSchema>
interface ILoginFormProps {
  handleLogin: (data: TForm) => void
}

export const LoginForm: React.FC<ILoginFormProps> = ({ handleLogin }) => {
  const resolver = useYupValidationResolver(formSchema)
  const { handleSubmit, control } = useForm<TForm>({
    resolver,
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: TForm) => {
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
      <Button type="submit" variant="contained" color="warning">
        Entrar
      </Button>

      {/* Guest credentials */}
      <Button
        startIcon={
          <Avatar
            src="https://res.cloudinary.com/drjnirfci/image/upload/v1669297921/chat-app/i1e24pvji2z5naiakjlq.png"
            alt="Mario"
          />
        }
        variant="contained"
        color="error"
        onClick={() =>
          onSubmit({ email: 'mario@email.com', password: '123123123' })
        }
      >
        Usar as credenciais do Mario
      </Button>
      <Button
        startIcon={
          <Avatar
            src="https://res.cloudinary.com/drjnirfci/image/upload/v1669297887/chat-app/froztm6yvlftzinraslk.png"
            alt="Yoshi"
          />
        }
        variant="contained"
        color="error"
        onClick={() =>
          onSubmit({ email: 'yoshi@email.com', password: '123123123' })
        }
      >
        Usar as credenciais do Yoshi
      </Button>
      <Button
        startIcon={
          <Avatar
            src="https://res.cloudinary.com/drjnirfci/image/upload/v1669302418/chat-app/ikkhi3gvd6b0nhfztp1i.png"
            alt="Peach"
          />
        }
        variant="contained"
        color="error"
        onClick={() =>
          onSubmit({ email: 'peach@email.com', password: '123123123' })
        }
      >
        Usar as credenciais da Peach
      </Button>
      {/* /Guest credentials */}
    </Box>
  )
}
