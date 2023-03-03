import { useState, useEffect, useRef } from 'react'

import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Send from '@mui/icons-material/Send'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useSocket } from '../../hooks/useSocket'
import { TChat } from '../../interface'

export const SendMessageForm = () => {
  const dispatch = useAppDispatch()
  const chat = useAppSelector(state => state.chat.chat)

  const [message, setMessage] = useState('')

  const socket = useSocket()
  const canSendMessage = !!chat && !!message.trim()

  const lastChat = useRef<TChat | null>(null)
  const typing = useRef(false)

  useEffect(() => {
    if (!chat) return

    if (!lastChat.current) return

    if (!message && typing.current) {
      typing.current = false
      socket.emit('stop typing', chat._id)
      return
    }

    if (!typing.current) {
      typing.current = true
      socket.emit('typing', chat._id)
    }

    const typingTimer = setTimeout(() => {
      typing.current = false
      socket.emit('stop typing', chat._id)
    }, 3000)

    return () => {
      clearTimeout(typingTimer)
    }
  }, [message, socket, chat])

  useEffect(() => {
    lastChat.current = chat
    return () => {
      if (!!lastChat.current && typing.current === true) {
        typing.current = false
        socket.emit('stop typing', lastChat.current._id)
      }
      lastChat.current = null
    }
  }, [chat, socket])

  const handleSubmitMessage = () => {
    if (!canSendMessage) return
    dispatch(sendMessage({ chatId: chat._id, content: message }))

    setMessage('')
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
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
