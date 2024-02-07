import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import { type BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { type AuthStackParamList, type LoginSuccessStackParamList, type RootStackParamList } from '@/constants/type/navigationType'

const useCustomNavigation = (): any => {
  const navigation = useNavigation<
  NativeStackNavigationProp<RootStackParamList> &
  NativeStackNavigationProp<LoginSuccessStackParamList> &
  NativeStackNavigationProp<AuthStackParamList> &
  BottomTabBarButtonProps
  >()

  return { navigation }
}

export default useCustomNavigation
