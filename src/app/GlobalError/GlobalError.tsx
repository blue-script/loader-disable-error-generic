import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useAppSelector } from '../store.ts'

export const GlobalError = () => {
  const errorMessage = useAppSelector(state => state.app.error)

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  return <ToastContainer theme="dark" autoClose={3000} />
}
