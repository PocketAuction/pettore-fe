import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Guide (): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Guide</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
