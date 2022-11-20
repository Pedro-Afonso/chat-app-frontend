import { TextField, TextFieldProps } from '@mui/material'
import { Controller } from 'react-hook-form'

type TVTextFieldProps = TextFieldProps & {
  name: string
  label: string
  control?: any
}

export const VTextField: React.FC<TVTextFieldProps> = ({
  name,
  label,
  control,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextField
          {...rest}
          autoComplete="off"
          label={label}
          value={value}
          onChange={onChange}
          helperText={error ? error.message : null}
          error={!!error}
        />
      )}
    />
  )
}
