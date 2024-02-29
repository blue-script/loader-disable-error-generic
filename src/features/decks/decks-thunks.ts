import { Dispatch } from 'redux'
import { decksAPI, FetchDecksResponse, UpdateDeckParams } from './decks-api.ts'
import { addDeckAC, deleteDeckAC, setDecksAC, updateDeckAC } from './decks-reducer.ts'
import { setAppStatusAC } from '../../app/app-reducer.ts'
import axios, { AxiosError, isAxiosError } from 'axios'

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

export const updateDeckTC = (params: UpdateDeckParams) => async (dispatch: Dispatch) => {
  try {
    // throw new Error('Boom!!!') // for test case-3
    const res = await decksAPI.updateDeck(params)
    dispatch(updateDeckAC(res.data))
  } catch (e) {
    let errorMessage: string
    if (isAxiosError<ServerError>(e)) {
      console.log('ax')
      errorMessage = e.response ? e.response.data.errorMessages[0].message : e.message
    } else {
      errorMessage = (e as Error).message
    }
    console.log(errorMessage)
  }
}

type ServerError = {
  errorMessages: [
    {
      field: string,
      message: string
    }
  ]
}