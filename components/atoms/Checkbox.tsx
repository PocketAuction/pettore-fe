import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Colors } from '@/constants/styles'
import Icon from 'react-native-vector-icons/FontAwesome'

interface CheckboxProps {
  children: React.ReactNode
  isSelect: boolean
  onChange: (isSelect: boolean) => void
  style?: object
}

export default function Checkbox ({ children, ...props }: CheckboxProps): React.JSX.Element {
  const { isSelect = false, onChange, style } = props
  return (
    <Pressable style={[styles.container, { ...style }]} onPress={() => { onChange(!isSelect) }}>
      <View style={styles.checkboxContainer}>
        { isSelect && <Icon name="check" size={12} color={Colors.black03} />}
      </View>
      <Text>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    margin: 2,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.gray05,
    borderRadius: 3,
    backgroundColor: Colors.white
  }
})
