import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { VTextField } from '../Forms'
import * as yup from 'yup'
import { useYupValidationResolver } from '../../hooks'

const formSchema = yup.object({
  name: yup
    .string()
    .required('Crie um nome legal')
    .min(3, 'Precisa ter no mínimo 3 caracteres.'),
  email: yup
    .string()
    .email('Insira um email válido.')
    .required('O email é obrigatório.'),
  password: yup
    .string()
    .min(8, 'A senha precisa de no mínimo 8 caracteres.')
    .required('A senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
    .required('Confirme sua senha')
})

type TForm = yup.InferType<typeof formSchema>

interface IRegisterFormProps {
  handleRegister: (data: TForm) => void
}

export const RegisterForm: React.FC<IRegisterFormProps> = ({
  handleRegister
}) => {
  const resolver = useYupValidationResolver(formSchema)

  const { handleSubmit, control } = useForm<TForm>({
    resolver,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (data: TForm) => {
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
