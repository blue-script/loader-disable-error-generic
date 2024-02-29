import { Dispatch } from 'redux'
import { setAppErrorAC, SetAppErrorType } from '../../app/app-reducer.ts'

export const handleError = (dispatch: Dispatch<ErrorUtilsDispatchType>, err: ErrorType) => {
  dispatch(setAppErrorAC(err.message))
}

type ErrorUtilsDispatchType = SetAppErrorType
export type ErrorType = {
  message: string
}