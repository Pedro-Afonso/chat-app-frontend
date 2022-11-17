import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

interface IChatRoomProps {
  chat?: any
}

export const ChatRoom: React.FC<IChatRoomProps> = ({ chat }) => {
  return (
    <Box
      display="flex"
      width={{ xs: '100%', md: '60vw' }}
      padding={{ xs: '1rem', md: '1rem' }}
      paddingBottom="0px"
    >
      <Box
        component={Paper}
        width="100%"
        flexGrow={1}
        height="calc(100vh - 100px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography fontSize="2rem" textAlign="center">
          {chat}
        </Typography>
      </Box>
    </Box>
  )
}
