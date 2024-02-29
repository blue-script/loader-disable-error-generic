import { Dispatch } from 'redux'
import { decksAPI, FetchDecksResponse, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import axios, { AxiosError } from 'axios'

export const fetchDecksTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await decksAPI.fetchDecks()
    dispatch(setDecksAC(res.data.items))
    dispatch(setAppStatusAC('succeeded'))
  } catch (err) {
    dispatch(setAppStatusAC('failed'))
  }
}
export const addDeckTC = (name: string) => async (dispatch: Dispatch) => {
  return decksAPI.addDeck(name).then((res) => {
    dispatch(addDeckAC(res.data))
  })
}
export const deleteDeckTC = (id: string) => async (dispatch: Dispatch) => {
  return decksAPI.deleteDeck(id).then((res) => {
    dispatch(deleteDeckAC(res.data.id))
  })
}

// case-1: ошибка бэкенда (на стороне бэка). Ошибку создает axios, в e.response.data помещает ответ сервера
// case-2: network error - axios создает объект ошибки, сообщение можно взять из поля е.message
// case-3: синхронные ошибки - создается "нативная" JS-ошибка, имеет поле message (axios здесь не причем)

type ErrorType = {
  errorMessages: [
    {
      field: string,
      message: string
    }
  ]
}
type SimpleErrorType = {
  message: string
}
export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    // throw new Error('Boom!!!') // for test case-3
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (e) {
    let errorMessage: string = ''
    if (axios.isAxiosError<ErrorType>(e) && e.response) {
      errorMessage = e.response.data.errorMessages[0].message;
    } else if (axios.isAxiosError<SimpleErrorType>(e)) {
      console.log('axios')
      errorMessage = e.message
    } else if (e instanceof  Error) {
      errorMessage = e.message
    }
    console.log(errorMessage)
  }
}
