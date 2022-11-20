import { useState } from 'react'
import { useForm } from 'react-hook-form'

import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import * as yup from 'yup'

import { VTextField } from '../Forms'
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
  handleRegister: (data: FormData) => void
}

export const RegisterForm: React.FC<IRegisterFormProps> = ({
  handleRegister
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>()
  const [profileImage, setProfileImage] = useState<File | null>()

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

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    const url = file && URL.createObjectURL(file)
    setPreviewImage(url)
    setProfileImage(file)
  }

  const onSubmit = (data: TForm) => {
    // Build form data
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value)
    })

    if (profileImage) {
      formData.append('profileImage', profileImage)
    }

    handleRegister(formData)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Box display="flex" justifyContent="center" gap={2}>
        <Avatar
          src={previewImage || undefined}
          alt="/"
          sx={{ width: 125, height: 125 }}
        />
        <Box alignSelf="center">
          <Button
            size="large"
            aria-label="Carregar imagem"
            component="label"
            color="success"
            variant="contained"
            sx={{ mx: 'auto' }}
            startIcon={<PhotoCamera />}
          >
            <input hidden accept="image/*" type="file" onChange={handleFile} />
            Carregar
          </Button>
        </Box>
      </Box>
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
      <Button type="submit" variant="contained" color="warning">
        Cadastrar
      </Button>
    </Box>
  )
}
