import { Box } from '@mui/material'
import { keyframes } from '@mui/system'
import { useMemo } from 'react'

export const FloatSquaresAnimation = () => {
  const spin = keyframes`
  from {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }
  to {
    transform: translateY(calc(-100vh - 230px)) rotate(720deg);
    opacity: 0.3;
    border-radius: 40%;
  }
`

  const squareList = useMemo(() => {
    return Array.from({ length: 12 }, () => {
      const left = Math.random() * 100
      const size = Math.random() * 200 + 30
      const delay = Math.random() * 15
      return {
        position: 'absolute',
        display: 'block',
        listStyle: 'none',
        background: 'rgba(255, 255, 255, 0.2)',
        animation: `${spin} 25s linear infinite`,
        bottom: '-230px',

        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${size > 150 ? '15s' : '10s'}`
      }
    })
  }, [spin])

  return (
    <Box
      sx={{
        background: 'inherit',
        position: 'absolute',
        zIndex: '1',
        width: '100%',
        height: '100vh'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        {squareList.map((square, key) => (
          <Box key={key} sx={square}></Box>
        ))}
      </Box>
    </Box>
  )
}
