import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function FindComponent (): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Find</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 }
})
