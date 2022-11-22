import { useCallback } from 'react'
import { FieldError } from 'react-hook-form'
import * as yup from 'yup'
import { AssertsShape } from 'yup/lib/object'

export const useYupValidationResolver = <T extends yup.AnyObjectSchema>(
  validationSchema: T
) =>
  useCallback(
    async (data: AssertsShape<any>) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        return {
          values,
          errors: {}
        }
      } catch (errors) {
        if (!(errors instanceof yup.ValidationError)) throw errors
        return {
          values: {},
          errors: errors.inner.reduce<Record<string, FieldError>>(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path as string]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
              }
            }),
            {}
          )
        }
      }
    },
    [validationSchema]
  )
