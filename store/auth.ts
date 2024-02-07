import { atom } from 'jotai'
import { getParams } from '@/util/common'

export const urlQueryString = atom('')

export const convertUrlQueryString = atom(async (get) => getParams(get(urlQueryString)))

export const socialLoginType = atom('LOCAL')

export const upperCaseSocialLoginType = atom(async (get) => get(socialLoginType).toUpperCase())
