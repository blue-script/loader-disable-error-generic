import { Dispatch } from 'redux'
import { setAppErrorAC, SetAppErrorType } from '../../app/app-reducer.ts'
import { isAxiosError } from 'axios'

export const handleError = (dispatch: Dispatch<ErrorUtilsDispatchType>, e: unknown) => {
  let errorMessage: string
  if (isAxiosError<ServerError>(e)) {
    errorMessage = e.response ? e.response.data.errorMessages[0].message : e.message
  } else {
    errorMessage = (e as Error).message
  }

  dispatch(setAppErrorAC(errorMessage))
}

type ServerError = {
  errorMessages: Array<{ field: string, message: string }>
}
type ErrorUtilsDispatchType = SetAppErrorType
