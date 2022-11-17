import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Add from '@mui/icons-material/Add'
import Box from '@mui/material/Box'

export const ChatListHeader = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
      >
        <Typography
          fontSize={{ xs: '1rem', md: '0.9rem', lg: '1rem' }}
          letterSpacing="0.1rem"
          textTransform="uppercase"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          Meus chats
        </Typography>
        <Button
          variant="outlined"
          endIcon={<Add />}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          Criar um grupo
        </Button>
      </Box>
      <Divider />
    </>
  )
}
