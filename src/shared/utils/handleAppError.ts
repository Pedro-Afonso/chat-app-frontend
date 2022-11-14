/* eslint-disable no-console */

export const handleAppError = (error: any): string => {
  if (error instanceof Error) {
    const { message } = error
    console.error(message)
    return 'Ocorreu um erro, por favor tente mais tarde.'
  } else {
    console.error(error)
    return 'Ocorreu um erro, por favor tente mais tarde.'
  }
}
