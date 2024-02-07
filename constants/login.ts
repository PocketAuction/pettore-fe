import { type ImageSourcePropType } from 'react-native'

// logo image
import naverLogo from '@/assets/auth/naver.png'
import kakaoLogo from '@/assets/auth/kakao.png'
import googleLogo from '@/assets/auth/google_ios.png'
import { prefix } from '@/api'

export type loginInfoMapType = Record<string, loginInfoMapValueType>

export interface loginInfoMapValueType {
  logo: ImageSourcePropType
  link: string
  imageStyle: imageStyleType
  propStyle?: imageStyleType
}

type imageStyleType = Record<string, number | string>

export const loginInfoMap: loginInfoMapType = {
  naver: {
    logo: naverLogo as ImageSourcePropType,
    link: `${prefix}/api/login/NAVER`,
    propStyle: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      maxWidth: 50,
      height: 50
    },
    imageStyle: {
      width: 50,
      height: 50
    }
  },
  kakao: {
    logo: kakaoLogo as ImageSourcePropType,
    link: `${prefix}/api/login/KAKAO`,
    imageStyle: {
      width: 30, height: 30
    },
    propStyle: {
      width: 50, height: 50, backgroundColor: '#ffde2a', borderRadius: 50, overflow: 'hidden', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    }
  },
  google: {
    logo: googleLogo as ImageSourcePropType,
    link: `${prefix}/api/login/GOOGLE`,
    propStyle: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      maxWidth: 50,
      height: 50
    },
    imageStyle: {
      width: 50,
      height: 50,
      margin: 0,
      padding: 0
    }
  }
} as const

export const socialLoginValidationMap = ['email', 'name', 'nickname'] as const
export const normalLoginValidationMap = ['email', 'id', 'name', 'nickname', 'password'] as const
