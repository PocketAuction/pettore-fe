import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import useCustomNavigation from '@/customhooks/useCustomNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Settings (): React.JSX.Element {
  const { navigation } = useCustomNavigation()
  const handleLogout = (): void => {
    void AsyncStorage.clear()
    navigation.navigate('Auth', { screen: 'Login' })
  }
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
