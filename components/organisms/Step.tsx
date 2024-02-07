import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ProgressBar } from '@/components/atoms/ProgressBar'
import FlatButton from '@/components/atoms/FlatButton'

interface StepProps {
  currentStep: number
  title?: string
  children: React.ReactNode[]
  stepHandler: () => Promise<void>
}
export default function Step (props: StepProps): React.JSX.Element {
  const { currentStep, title, children, stepHandler } = props

  const handleClick = async (): Promise<void> => {
    await stepHandler()
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressBarWrapper}>
        <ProgressBar total={children.length} currentStep={currentStep}/>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        {children[currentStep - 1]}
      </View>
      <FlatButton onPress={handleClick}>다음</FlatButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 60
  },
  progressBarWrapper: {
    marginVertical: 30,
    backgroundColor: '#000'
  },
  content: {
    flex: 1
  }
})
