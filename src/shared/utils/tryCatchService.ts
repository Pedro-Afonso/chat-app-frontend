import { TErrors } from '../interface'
import { handleAppError } from './handleAppError'

export const tryCatchService = async <F extends () => any>(
  cb: F
): Promise<ReturnType<F> | TErrors> => {
  try {
    return await cb()
  } catch (error) {
    return { errors: [handleAppError(error)] } as TErrors
  }
}
