import React from 'react'

import { StatusBar } from 'expo-status-bar'

// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';

import Navigations from './navigations'

import 'react-native-gesture-handler'
import Toast from '@/components/atoms/Toast'
import LoadingOverlay from '@/components/atoms/LoadingOverlay'
// import {useFonts} from 'expo-font';

// SplashScreen.preventAutoHideAsync();

export default function App (): React.JSX.Element {
  // font 불러오는 로직
  // 배열로 font 불러온 여부를 받아온다 (fontsLoaded)
  // const [fontsLoaded] = useFonts({
  // 	'GmarketSans-light': require('./assets/fonts/GmarketSansLight.otf'),
  // 	'GmarketSans-medium': require('./assets/fonts/GmarketSansMedium.otf'),
  // 	'GmarketSans-bold': require('./assets/fonts/GmarketSansBold.otf'),
  // });

  // font를 불러왔으면 splash 화면을 숨겨준다.
  // const onLayoutRootView = useCallback(async () => {
  // 	if (fontsLoaded) {
  // 		await SplashScreen.hideAsync();
  // 	}
  // }, [fontsLoaded]);

  // font 로딩중에는 앱 화면을 바인딩 하지 않는다.
  // if (!fontsLoaded) {
  // 	return null;
  // }

  return (
    <>
      <StatusBar style="auto" />
      <Navigations />
      <Toast />
      <LoadingOverlay />
    </>
  )
}
