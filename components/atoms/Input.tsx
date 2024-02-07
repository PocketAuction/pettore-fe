import React from 'react'
import { TextInput, View, Text, StyleSheet, type StyleProp, type TextStyle } from 'react-native'
import { Colors, CommonStyle } from '@/constants/styles'
import IconButton from '@/components/atoms/IconButton'
import Icon from 'react-native-vector-icons/AntDesign'
import Row from '@/components/atoms/Row'
import Col from '@/components/atoms/Col'
import code from '@/constants/responseCode'
import { isEmpty } from '@/util/common'

interface InputProps {
  value?: string
  onChangeText: (text: string) => void
  placeholder?: string
  isSecure?: boolean
  errorCode?: string
  successCode?: string
  isResetButton?: boolean
  resetHandler?: () => void
  children?: React.ReactNode
  isCustomButton?: boolean
  propsStyle?: object
}

function CloseButton ({ onPress }: { onPress: () => void }): React.JSX.Element {
  return (
    <IconButton onPress={onPress} style={styles.iconButton}>
      <Icon name="closecircleo" size={16}/>
    </IconButton>
  )
}

export function Input ({ onChangeText, ...props }: InputProps): React.JSX.Element {
  const { isSecure, placeholder, value, errorCode, isResetButton, resetHandler, isCustomButton, successCode, children } = props
  const [isFocus, setIsFocus] = React.useState(false)
  const handleTextChange = (text: string): void => {
    onChangeText(text)
  }

  const getTextColor = (): { color: string } | string => {
    return !isEmpty(errorCode) ? CommonStyle.colorRed : !isEmpty(successCode) ? CommonStyle.colorPrimary : ''
  }

  const getBorderColor = (): { borderColor: string } | string => {
    return !isEmpty(errorCode) ? styles.borderBottomError : !isEmpty(successCode) ? styles.borderBottomSuccess : ''
  }

  return (
    <View style={[styles.inputContainer, { ...props.propsStyle }]}>
      <Row propsStyle={[
        styles.inputBorder,
        CommonStyle.colCenter, getBorderColor() as StyleProp<TextStyle>
      ]}>
        <Col propsStyle={styles.positionRelative}>
          <Text style={[styles.placeholder, isFocus && styles.placeholderActive]}>{placeholder}</Text>
          <TextInput
            style={styles.input}
            keyboardType='default'
            secureTextEntry={isSecure}
            onChangeText={handleTextChange}
            value={value}
            onFocus={() => { setIsFocus(true) }}
            onBlur={() => { setIsFocus(value !== undefined && value.length > 0) }}
          />
        </Col>
        {(isCustomButton ?? false) && children}
        {(isResetButton ?? false) && <CloseButton onPress={resetHandler as () => void} />}
      </Row>
      <Text
        style={[styles.descriptionText, getTextColor() as StyleProp<TextStyle>]}
      >
        {(errorCode !== null) && code[errorCode as keyof typeof code]}
        {(successCode !== null) && code[successCode as keyof typeof code]}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  iconButton: { width: 30 },
  inputContainer: {
    justifyContent: 'center',
    marginTop: 10
  },
  inputBorder: {
    borderBottomWidth: 1,
    borderColor: Colors.black05,
    borderStyle: 'solid'
  },
  input: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    paddingLeft: 18,
    paddingTop: 21,
    paddingBottom: 21

  },
  positionRelative: { position: 'relative' },
  placeholder: {
    position: 'absolute',
    left: 18,
    top: 23,
    fontSize: 14,
    color: Colors.black01,
    zIndex: 1
  },
  placeholderActive: {
    top: -10
  },
  borderBottomError: {
    borderColor: Colors.error500
  },
  borderBottomSuccess: {
    borderColor: Colors.primary
  },
  descriptionText: {
    height: 18,
    marginTop: 6
  }
})

export default Input
