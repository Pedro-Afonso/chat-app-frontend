import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

import { Button } from '@mui/material'
import Add from '@mui/icons-material/Add'
import { useAppDispatch } from '../../../../store/index2'
import { toogleIsAddGroupModalOpen } from '../../../../slices/potalSlice'

export const ChatListHeader = () => {
  const dispatch = useAppDispatch()

  const handleOpenModal = () => {
    dispatch(toogleIsAddGroupModalOpen())
  }

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
          onClick={handleOpenModal}
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
