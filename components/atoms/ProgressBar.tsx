import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Colors } from '@/constants/styles'

interface ProgressBarProps {
  total: number
  currentStep: number
}
export function ProgressBar (props: ProgressBarProps): React.JSX.Element {
  const { total = 0, currentStep = 0 } = props
  const progress = currentStep / total * 100
  return (
    <View style={styles.container}>
      <View style={styles.progressWrapper}>
        <View style={[styles.progressBar, { maxWidth: `${progress}%` }]}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  progressWrapper: {
    backgroundColor: '#000',
    height: 4,
    borderRadius: 2
  },
  progressBar: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 2
  }
})
