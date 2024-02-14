import { type CompositeScreenProps } from '@react-navigation/native'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { type StackScreenProps } from '@react-navigation/stack'

export type ValueOf<T> = T[keyof T]

export interface NavigationPropType<T> {
  screen?: keyof T
  params?: ValueOf<T>
}

export interface AuthStackParamList {
  Login: undefined
  Create: undefined
  Find: { flag: string }
}

export interface SearchTabParamList {
  flag: string
}

export interface LoginSuccessStackParamList {
  Home: undefined
  Search?: NavigationPropType<SearchTabParamList>
  Bookmark: undefined
  MyPage: undefined
}

export interface BottomTabParamList {
  Home: undefined
  Search?: NavigationPropType<SearchTabParamList>
  Bookmark: undefined
  MyPage: undefined
}

export interface RootStackParamList {
  Auth?: NavigationPropType<AuthStackParamList>
  Index?: NavigationPropType<LoginSuccessStackParamList>
  HotPlace: undefined
  NewPlace: undefined
  PlaceDetail: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>

export type SearchTabScreenProps =
  CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Search'>,
  RootStackScreenProps<keyof RootStackParamList>
  >
