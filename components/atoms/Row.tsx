import React from 'react'
import { type childrenType } from '@/constants/type/commonType'
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'

type RowProps = childrenType & {
  propsStyle?: object | []
}

export default function Row ({ children, propsStyle }: RowProps): React.JSX.Element {
  const getStyles = (): any => {
    if (!(propsStyle == null) && Array.isArray(propsStyle)) {
      return [...propsStyle, styles.container] as StyleProp<ViewStyle>
    } else {
      return [propsStyle, styles.container]
    }
  }

  return (
    <View style={getStyles()}>
      {children}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
})
