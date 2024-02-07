import AsyncStorage from '@react-native-async-storage/async-storage'

// import { createResponseMsg, isSuccessApiCall, setToken } from '@/util/common'
import type responseCode from '@/constants/responseCode'
import {IBannerListResponse, IHotPlaceResponse, IRecommendPlaceResponse, INewPlaceResponse, IThemeResponse, ILocationCodeResponse} from "@/constants/type/apiResponseType";

export interface IloginParams {
  id?: string
  password?: string
  email: string
  nickname: string
  name: string
  birthDay: string
  phone: string
  social: 'GOOGLE' | 'KAKAO' | 'NAVER'
}

export interface Iresponse {
  code: keyof typeof responseCode
  message: string
}

export interface IresponseClient {
  code: 200 | 500
  message: string
}
export interface IsignUpDuplicationCheckProps {
  type: 'ID' | 'NICKNAME'
  duplicationData: Pick<IloginParams, 'id' | 'nickname'>
}

interface IfindLoginInfo {
  params: Pick<IloginParams, 'birthDay' | 'id' | 'name' | 'phone'>
  findType: 'id' | 'password'
}

interface ItokenResponse {
  accessToken: string
  refreshToken: string
}

export const prefix = 'http://jini-dev.xyz:28081'

// api 호출함수
async function fetchData<T> (url = '', params = {}, methods = 'GET'): Promise<T> {
  const Authorization = await AsyncStorage.getItem('accessToken')
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
    method: methods,
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${Authorization ?? ''}`
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    ...(methods !== 'GET' && { body: JSON.stringify(params) }) // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
  })
  return await response.json() // JSON 응답을 네이티브 JavaScript 객체로 파싱
}

// 회원가입 응답 타입
interface IcreateUserResponse extends Iresponse {
  data: ItokenResponse
}
// 소셜 로그인 추가정보 입력 | 회원가입
// export const createUser = async (params: IloginParams): Promise<IresponseClient> => {
//   try {
//     const response = await fetchData<IcreateUserResponse>(`${prefix}/api/users`, params, 'POST')
//
//     if (isSuccessApiCall(response.code)) {
//       await setToken(response.data.accessToken, response.data.refreshToken)
//
//       return createResponseMsg(response.code)
//     }
//
//     return createResponseMsg('F9003')
//   } catch (e) {
//     console.error('api call:create user Error', e)
//
//     return createResponseMsg('F9003')
//   }
// }

export const createUser = async (params: IloginParams): Promise<IcreateUserResponse> => {
  return await fetchData<IcreateUserResponse>(`${prefix}/api/users`, params, 'POST')
}

// 로그인 응답 타입
export interface ILoginResponse extends Iresponse {
  data: ItokenResponse
}
// 로그인
// export const login = async (params: Pick<IloginParams, 'id' | 'password'>): Promise<IresponseClient> => {
//   try {
//     const response = await fetchData<ILoginResponse>(`${prefix}/api/login`, params, 'POST')
//     if (isSuccessApiCall(response.code)) {
//       await setToken(response.data.accessToken, response.data.refreshToken)
//     }
//
//     return createResponseMsg(response.code)
//   } catch (e) {
//     console.error('api call:Login Error', e)
//     return createResponseMsg('F0000')
//   }
// }

export const login = async (params: Pick<IloginParams, 'id' | 'password'>): Promise<ILoginResponse> => {
  return await fetchData<ILoginResponse>(`${prefix}/api/login`, params, 'POST')
}

// 아이디 찾기 응답 타입
interface IFindIdResponse extends Iresponse {
  data: {
    email: string
    id: string
    social: 'GOOGLE' | 'KAKAO' | 'NAVER'
  }
}

// 비밀번호 찾기 응답 타입
interface IFindPasswordResponse extends Iresponse {
  data: null
}
// 아이디 & 비밀번호 찾기
// export const findLoginInfo = async (params: IfindLoginInfo): Promise<IresponseClient> => {
//   try {
//     const response = await fetchData<IFindIdResponse | IFindPasswordResponse>(`${prefix}/api/users/${params.findType}`, params.params)
//     return createResponseMsg(response.code)
//   } catch (e) {
//     console.error('api call:findLoginInfo Error', e)
//     return createResponseMsg('F0000')
//   }
// }

export const findLoginInfo = async (params: IfindLoginInfo): Promise<IFindIdResponse | IFindPasswordResponse> => {
  return await fetchData<IFindIdResponse | IFindPasswordResponse>(`${prefix}/api/users/${params.findType}`, params.params)
}

// 비밀번호 변경

interface IChangePasswordResponse extends Iresponse {
  data: null
}
// export const changePassword = async (params: Pick<IloginParams, 'id' | 'password' | 'name' | 'phone' | 'birthDay'>): Promise<IresponseClient> => {
//   try {
//     const response = await fetchData<IChangePasswordResponse>(`${prefix}/api/users/password`, params, 'PUT')
//     return createResponseMsg(response.code)
//   } catch (e) {
//     console.error('api call:changePassword Error', e)
//     return createResponseMsg('F0000')
//   }
// }

export const changePassword = async (params: Pick<IloginParams, 'id' | 'password' | 'name' | 'phone' | 'birthDay'>): Promise<IChangePasswordResponse> => {
  return await fetchData<IChangePasswordResponse>(`${prefix}/api/users/password`, params, 'PUT')
}

interface ICheckIdResponse extends Iresponse {
  data: null
}
// 아이디 중복확인
// export const signUpDuplicationCheck = async (params: IsignUpDuplicationCheckProps): Promise<Iresponse | IresponseClient> => {
//   const { type, duplicationData } = params
//   try {
//     return await fetchData<ICheckIdResponse>(`${prefix}/api/users/check/${type === 'ID' ? 'id' : 'nickname'}`, duplicationData, 'POST')
//   } catch (e) {
//     console.error('api call:checkDuplication Error', e)
//     return createResponseMsg('F0000')
//   }
// }

export const signUpDuplicationCheck = async (params: IsignUpDuplicationCheckProps): Promise<ICheckIdResponse> => {
  const { type, duplicationData } = params
  return await fetchData<ICheckIdResponse>(`${prefix}/api/users/check/${type === 'ID' ? 'id' : 'nickname'}`, duplicationData, 'POST')
}

// 메인 > 배너 조회
export const getBannerList = async (): Promise<IBannerListResponse> => {
  return await fetchData<IBannerListResponse>(`${prefix}/api/banner/list`)
}

// 메인 > 핫 플레이스 조회
export const getHotPlace = async (): Promise<IHotPlaceResponse> => {
  return await fetchData<IHotPlaceResponse>(`${prefix}/api/main/hot-place`)
}

// 메인 > 어디로 갈까요 조회
export const getRecommendPlace = async (): Promise<IRecommendPlaceResponse> => {
  return await fetchData<IRecommendPlaceResponse>(`${prefix}/api/main/where-location`)
}

// 메인 > 뉴 플레이스 조회
export const getNewPlace = async (): Promise<INewPlaceResponse> => {
  return await fetchData<INewPlaceResponse>(`${prefix}/api/main/new-place`)
}


// 메인 > 테마 추천
export const getTheme = async (): Promise<IThemeResponse> => {
  return await fetchData<IThemeResponse>(`${prefix}/api/main/theme`)
}


// 지역 코드 조회
export const getLocationCode = async (): Promise<ILocationCodeResponse> => {
  return await fetchData<ILocationCodeResponse>(`${prefix}/api/codes/locations`)
}
