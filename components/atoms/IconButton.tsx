import React from 'react'
import { Pressable } from 'react-native'

interface IconButtonProps {
  children: React.ReactNode
  onPress: () => void
  style?: object
}
export default function IconButton (props: IconButtonProps): React.JSX.Element {
  const { children, onPress, style } = props

  return (
    <Pressable onPress={onPress} {...style}>
      {children}
    </Pressable>
  )
}
