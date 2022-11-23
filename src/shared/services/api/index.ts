import axios from 'axios'

export const Api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_CHAT_URL
})
