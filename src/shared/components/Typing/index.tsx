import { useEffect, useCallback, useState } from 'react'

import Slide from '@mui/material/Slide'
import { keyframes } from '@mui/system/'
import Box from '@mui/material/Box'

import { useSocket } from '../../hooks/useSocket'

const Dot = ({ delay }: { delay: number }) => {
  const animation = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.3;
    transform: translateY(-3px);
  }
`

  return (
    <Box
      sx={[
        {
          width: '8px',
          height: '8px',
          background: 'black',
          borderRadius: '50%',
          animation: `${animation} 1s infinite`,
          animationDelay: `${delay}s`
        }
      ]}
    ></Box>
  )
}

export const Typing = () => {
  const socket = useSocket()

  const [isTyping, setIsTyping] = useState(false)

  const handleTyping = useCallback(() => {
    setIsTyping(true)
  }, [])

  const handleStopTyping = useCallback(() => {
    setIsTyping(false)
  }, [])
  useEffect(() => {
    socket.on('typing', handleTyping)
    socket.on('stop typing', handleStopTyping)

    return () => {
      socket.off('typing', handleTyping)
      socket.off('stop typing', handleStopTyping)
    }
  }, [socket, handleTyping, handleStopTyping])

  return (
    <Slide direction="up" in={isTyping} mountOnEnter unmountOnExit>
      {
        <Box
          display="flex"
          alignContent="center"
          justifyContent="center"
          gap={1}
          position="relative"
          width="4rem"
          height="2rem"
          padding="0.5rem"
          mx={2}
          mb={1}
          sx={{
            background: '#e6e6e6',
            borderRadius: '20px'
          }}
        >
          <Dot delay={0} />
          <Dot delay={0.25} />
          <Dot delay={0.5} />
        </Box>
      }
    </Slide>
  )
}
