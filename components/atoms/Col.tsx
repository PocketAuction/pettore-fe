import React from 'react'
import { type childrenType } from '@/constants/type/commonType'
import { View, StyleSheet } from 'react-native'
type RowProps = childrenType & {
  propsStyle?: object
}
export default function Row ({ children, propsStyle }: RowProps): React.JSX.Element {
  return (
    <View style={[styles.container, propsStyle]}>{children}</View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
