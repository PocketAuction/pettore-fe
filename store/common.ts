import { atom } from 'jotai'

export interface toastAtomType {
  is: boolean
  msg: string
  type?: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
}

export const toastAtom = atom({
  is: false,
  msg: '',
  type: 'INFO'
})

export const loadingAtom = atom({
  is: false,
  msg: ''
})
