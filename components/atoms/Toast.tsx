import React, { useCallback, useEffect, useRef } from 'react'
import { Text, View, Animated, StyleSheet } from 'react-native'
import { toastAtom } from '@/store/common'
import { useAtom } from 'jotai'

export default function Toast (): React.JSX.Element | false {
  const [toastInfo, setToastInfo] = useAtom(toastAtom)

  const fadeAnim = useRef(new Animated.Value(0)).current
  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }, [toastInfo])

  const fadeOut = useCallback(() => {
    setTimeout(() => {
      setToastInfo((prev) => ({ ...prev, msg: '', is: false }))
    }, 1000)
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start()
  }, [toastInfo])

  useEffect((): any => {
    if (toastInfo.is) {
      fadeIn()

      const timer = setTimeout(() => {
        fadeOut()
      }, 3000)

      return () => { clearTimeout(timer) }
    }
  }, [fadeIn, fadeOut, toastInfo])

  return toastInfo.is && (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.inner}>
        <Text style={styles.text}>{toastInfo.msg}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  inner: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 10
  },
  text: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
    padding: 2
  }
})
