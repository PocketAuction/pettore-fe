import React from 'react'
import { type GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native'

import { Colors } from '@/constants/styles'
import { type childrenType } from '@/constants/type/commonType'

type FlatButtonProps = childrenType & {
  onPress: (arg: GestureResponderEvent) => Promise<void> | void
  propStyle?: object
  resetStyle?: boolean
  disabled?: boolean
}

function FlatButton (props: FlatButtonProps): React.ReactNode {
  const { children, onPress, resetStyle, propStyle, disabled } = props
  return (
    <Pressable
      style={
        ({ pressed }) => [
          (resetStyle !== false) && styles.button,
          pressed && styles.pressed,
          propStyle,
          (disabled ?? false) && styles.disabled
        ]}
      onPress={disabled === null ? null : onPress}
    >
      <View>
        <Text style={[styles.buttonText, propStyle]}>{children}</Text>
      </View>
    </Pressable>
  )
}

export default FlatButton

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    backgroundColor: Colors.primary,
    borderRadius: 4,
    marginVertical: 20
  },
  pressed: {
    opacity: 0.7
  },
  disabled: {
    backgroundColor: Colors.black05,
    color: Colors.black04
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: Colors.white
  },
  mb20: {
    marginBottom: 20
  }
})
