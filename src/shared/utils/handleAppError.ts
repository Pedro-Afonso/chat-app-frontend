/* eslint-disable no-console */

import { AxiosError } from 'axios'

export const handleAppError = (error: any): string[] => {
  if (error instanceof AxiosError) {
    const data = error.response?.data || ''
    if ('errors' in data) {
      return data.errors
    }
  }
  if (error instanceof Error) {
    const { message } = error
    console.error(message)
    return ['Ocorreu um erro, por favor tente mais tarde.']
  } else {
    console.error(error)
    return ['Ocorreu um erro, por favor tente mais tarde.']
  }
}
