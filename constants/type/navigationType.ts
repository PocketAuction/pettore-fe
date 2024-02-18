import { type NavigatorScreenParams } from '@react-navigation/native'

export type AuthStackParamList = {
  Login: undefined
  Create: undefined
  Find: { flag: string }
}

export type LoginSuccessStackParamList = {
  Home: undefined
  Search?: { flag: string }
  Bookmark: undefined
  MyPage: undefined
}

export type BottomTabParamList = {
  Home: undefined
  Search?: { flag: string }
  Bookmark: undefined
  MyPage: undefined
}

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>
  Index: NavigatorScreenParams<LoginSuccessStackParamList>
  HotPlace: undefined
  NewPlace: undefined
  PlaceDetail: undefined
}
