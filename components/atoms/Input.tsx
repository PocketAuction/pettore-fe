import React from 'react'
import { TextInput, StyleSheet, type StyleProp, type TextStyle } from 'react-native'

export interface InputProps {
  value?: string // 입력값
  onChangeText: (text: string) => void // 텍스트 변경 핸들러
  placeholder?: string // placeholder
  isSecure?: boolean // secureTextEntry 여부
  onFocus?: (e: boolean) => void // 포커스 이벤트
  onBlur?: (e: boolean) => void // 포커스 아웃 이벤트
  customStyle?: StyleProp<TextStyle> // 커스텀 스타일
}

export function Input ({ onChangeText, ...props }: InputProps): React.JSX.Element {
  const {
    isSecure,
    placeholder,
    value,
    customStyle,
    onFocus,
    onBlur
  } = props

  const handleTextChange = (text: string): void => {
    onChangeText(text)
  }

  const onFocusHandler = (e: boolean): void => {
    if (onFocus !== undefined) onFocus(e)
  }
  const onBlurHandler = (e: boolean): void => {
    if (onBlur !== undefined) onBlur(e)
  }

  return (
    <TextInput
      style={[styles.input, customStyle !== undefined && customStyle]}
      keyboardType='default'
      secureTextEntry={isSecure}
      onChangeText={handleTextChange}
      placeholder={placeholder}
      value={value}
      onFocus={() => { onFocusHandler(true) }}
      onBlur={() => { onBlurHandler(value !== undefined && value.length > 0) }}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    color: '#000'
  }
})

export default Input
