import React, { useCallback, useEffect } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import * as Linking from 'expo-linking'
import * as SplashScreen from 'expo-splash-screen'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from '@expo/vector-icons/Ionicons'

import LoginScreen from '../screens/Auth/Login'
import FindScreen from '../screens/Auth/Find'
import HomeScreen from '../screens/Home/index'
import UserScreen from '../screens/other/index'
import SettingsScreen from '../screens/Settings'
import SignupScreen from '../screens/Auth/SignUp'
import HotPlaceScreen from '../screens/HotPlace'
import NewPlaceScreen from '../screens/NewPlace'
import PlaceDetail from '../screens/PlaceDetail'

import { type AuthStackParamList, type LoginSuccessStackParamList, type RootStackParamList } from '@/constants/type/navigationType'
import IconButton from '@/components/atoms/IconButton'
import Icon from 'react-native-vector-icons/AntDesign'
import useCustomNavigation from '@/customhooks/useCustomNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
const BottomTab = createBottomTabNavigator<RootStackParamList & AuthStackParamList & LoginSuccessStackParamList>()
const Stack = createStackNavigator<RootStackParamList & AuthStackParamList & LoginSuccessStackParamList>()

void SplashScreen.preventAutoHideAsync()

function LoginSuccessNavigation (): React.JSX.Element {
  const { navigation } = useCustomNavigation()
  const checkToken = useCallback(async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem('accessToken')

    return !(token === null)
  }, [])

  // splash hide
  const hideSplash = useCallback(async (): Promise<void> => {
    await SplashScreen.hideAsync()
  }, [])

  // login redirect
  const redirectLogin = useCallback(async (): Promise<void> => {
    const isToken = await checkToken()

    if (!isToken) {
      navigation.navigate('Auth', { screen: 'Login' }, () => { void hideSplash() })
    }

    void hideSplash()
  }, [])

  useEffect(() => {
    void redirectLogin()
  }, [])

  return (
    <BottomTab.Navigator screenOptions={{
      tabBarStyle: { height: 70 },
      tabBarInactiveTintColor: '#666',
      tabBarActiveTintColor: '#0BCA7A',
      tabBarLabelStyle: { marginBottom: 16, marginTop: -8 }
    }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          )
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={UserScreen}
        options={{
          title: '검색',
          headerShown: false,
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          )
        }}
      />
      <BottomTab.Screen
        name="Bookmark"
        component={UserScreen}
        options={{
          title: '찜',
          headerShown: false,
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" color={color} size={size} />
          )
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={SettingsScreen}
        options={{
          title: 'MY',
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          )
        }}
      />
    </BottomTab.Navigator>
  )
}

const prefix: string = Linking.createURL('/')

function AuthNavigation (): React.JSX.Element {
  const { navigation } = useCustomNavigation()

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Create"
        component={SignupScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            height: 40,
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0
          },
          headerLeftContainerStyle: {
            paddingVertical: 9,
            paddingHorizontal: 16
          },
          headerLeft: () => <IconButton onPress={() => { navigation.navigate('Login') }}><Icon name="close" size={18}/></IconButton>
        }}
      />
      <Stack.Screen
        name='Find'
        component={FindScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            height: 40,
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0
          },
          headerLeftContainerStyle: {
            paddingVertical: 9,
            paddingHorizontal: 16
          },
          headerLeft: () => <IconButton onPress={() => { navigation.navigate('Login') }}><Icon name="close" size={18}/></IconButton>
        }}
      />
    </Stack.Navigator>
  )
}

export default function RootNavigations (): React.JSX.Element {
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Index: {
          screens: {
            Home: 'index',
            Add: 'add',
            Settings: 'settings'
          }
        },
        Auth: {
          screens: {
            Login: 'login',
            Create: 'create',
            Find: 'find'
          }
        }
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer linking={linking as never}>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: false
          }}
        >
          <Stack.Screen
            name="Index"
            component={LoginSuccessNavigation}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthNavigation}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="HotPlace"
            component={HotPlaceScreen}
            options={{
              title: 'HOT 플레이스',
              headerShown: true
            }}
          />
          <Stack.Screen
            name="NewPlace"
            component={NewPlaceScreen}
            options={{
              title: 'NEW 플레이스',
              headerShown: true
            }}
          />
          <Stack.Screen
            name="PlaceDetail"
            component={PlaceDetail}
            options={{
              title: '',
              headerShown: true
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}
