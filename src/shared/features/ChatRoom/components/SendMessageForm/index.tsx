import { useState, useCallback, useRef } from 'react'

import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Send from '@mui/icons-material/Send'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { useSocket } from '../../../../hooks/useSocket'

import { useSendMessageMutation } from '../../../../services'
import { useAppSelector } from '../../../../store/index2'
import { EVENTS } from '../../../../utils/constants'

export const SendMessageForm = () => {
  const [message, setMessage] = useState('')

  const isTyping = useRef(false)

  const typingTimer = useRef<NodeJS.Timeout>()

  const socket = useSocket()

  const chat = useAppSelector(state => state.chat.chat)

  const [sendMessage] = useSendMessageMutation()

  const canSendMessage = !!chat && !!message.trim()

  const stopTyping = useCallback((chatId: string) => {
    isTyping.current = false
    socket.emit(EVENTS.CLIENT.STOP_TYPING, { chatId })
    clearTimeout(typingTimer.current)
  }, [])

  const typing = useCallback((chatId: string) => {
    if (!isTyping.current) {
      isTyping.current = true
      socket.emit(EVENTS.CLIENT.START_TYPING, { chatId })
    }

    if (typingTimer.current) {
      clearTimeout(typingTimer.current)
    }

    typingTimer.current = setTimeout(() => {
      isTyping.current = false
      socket.emit(EVENTS.CLIENT.STOP_TYPING, { chatId })
    }, 3000)
  }, [])

  const handleSubmitMessage = () => {
    if (!canSendMessage) return
    stopTyping(chat._id)
    sendMessage({ chatId: chat._id, content: message })
    setMessage('')
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (!chat) return
    typing(chat._id)
    if (e.code === 'Enter' && e.shiftKey === false) {
      e.preventDefault()
      handleSubmitMessage()
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmitMessage()
  }

  return (
    <Box
      component="form"
      display="flex"
      alignContent="center"
      onSubmit={handleSubmit}
      onKeyDown={handleOnKeyDown}
    >
      <Box component={Paper} flexGrow={1} variant="elevation" elevation={24}>
        <TextField
          autoComplete="off"
          multiline={true}
          maxRows={4}
          fullWidth
          placeholder="Envie uma mensagem..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton type="submit" disabled={!canSendMessage} size="large">
          <Send />
        </IconButton>
      </Box>
    </Box>
  )
}
