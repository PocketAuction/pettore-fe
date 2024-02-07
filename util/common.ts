import {
  Dimensions, Linking, Platform, StatusBar
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import responseCode, { successCode } from '@/constants/responseCode'
import { type IresponseClient } from '@/api'

type objectType = Record<'email' | 'name', string>
export function linking (link: string): void {
  void Linking.openURL(link)
}

export function getParams (url: string): objectType | null {
  if (isEmpty(url)) return null // 빈 값 예외처리

  const params = convertUrl(url).split('?')[1].split('&')
  const res: objectType = { email: '', name: '' }
  params.forEach((param) => {
    const splitted = param.split('=')
    if (splitted[0] === 'email' || splitted[0] === 'name') {
      const propertyName = splitted[0] as 'email' | 'name'
      res[propertyName] = splitted[1].replace(/\+/g, ' ')
    }
  })
  return res
}

export function convertUrl (url: string): string {
  return decodeURIComponent(url)
}

export function createResponseMsg (code: keyof typeof responseCode): IresponseClient {
  return {
    code: convertResponseCode(code),
    message: responseCode[code]
  }
}

// 응답코드에 따른 http status code 반환
export function convertResponseCode (code: keyof typeof responseCode): 200 | 500 {
  return isSuccessApiCall(code) ? 200 : 500
}

// 응답코드에 따른 성공 여부 반환
export function isSuccessApiCall (code: keyof typeof responseCode): boolean {
  return successCode.includes(code)
}

export function convertResponseCodeToMsg (code: keyof typeof responseCode): string {
  return responseCode[code]
}

// 토큰 설정
export async function setToken (accessToken: string, refreshToken: string): Promise<void> {
  await AsyncStorage.setItem('accessToken', accessToken)
  await AsyncStorage.setItem('refreshToken', refreshToken)
}

// 디바이스 OS
export function getDeviceOS (): 'ios' | 'android' | 'windows' | 'macos' | 'web' {
  return Platform.OS
}

export function getDeviceStatusHeight (): number {
  const os = getDeviceOS()

  if (os === 'android') {
    return StatusBar.currentHeight ?? 0
  } if (os === 'ios') {
    return getStatusBarHeight(true)
  }

  return 0
}

// device size
export function getDeviceSize (flag: 'W' | 'H'): number {
  const deviceSize = {
    W: Dimensions.get('window').width,
    H: Dimensions.get('window').height
  }

  const isFlag = flag === 'W' || flag === 'H'

  return isFlag ? Math.floor(deviceSize[flag]) - Math.floor(getDeviceStatusHeight()) : 0
}

export async function getDeepLink (): Promise<string> {
  let response: string | null = ''
  try {
    response = await Linking.getInitialURL()
  } catch (e) {
    console.error('getDeepLink Error', e)
  }

  return response ?? ''
}

export function isEmpty (value: string | null | undefined): boolean {
  return value === '' || value === null || value === undefined
}

// 디바이스 정보
// export function getDeviceInfo() {
// 	return DeviceInfo.getModel();
// }

export default { linking, getParams }
