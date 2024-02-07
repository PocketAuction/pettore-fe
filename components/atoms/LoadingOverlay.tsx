import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { loadingAtom } from '@/store/common'
import { useAtomValue } from 'jotai'

function LoadingOverlay (): React.JSX.Element | false {
  const loadingInfo = useAtomValue(loadingAtom)

  return loadingInfo.is && (
    <View style={styles.rootContainer}>
      {(loadingInfo.msg !== '') && <Text style={styles.message}>{loadingInfo.msg}</Text>}
      <ActivityIndicator size="large" />
    </View>
  )
}

export default LoadingOverlay

const styles = StyleSheet.create({
  rootContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  message: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12
  }
})
