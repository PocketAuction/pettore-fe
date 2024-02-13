import React from 'react'
import { View, Text, StyleSheet, type StyleProp, type TextStyle } from 'react-native'
import { Colors, CommonStyle } from '@/constants/styles'
import IconButton from '@/components/atoms/IconButton'
import Icon from 'react-native-vector-icons/AntDesign'
import Row from '@/components/atoms/Row'
import Col from '@/components/atoms/Col'
import code from '@/constants/responseCode'
import { isEmpty } from '@/util/common'
import Input from '@/components/atoms/Input'

export interface InputFormProps {
  value?: string // 입력값
  onChangeText: (text: string) => void // 텍스트 변경 핸들러
  placeholder?: string // placeholder
  isSecure?: boolean // 암호화 여부
  errorCode?: string // 에러 코드
  successCode?: string // 성공 코드
  isResetButton?: boolean // 리셋 버튼 여부
  resetHandler?: () => void // 리셋 핸들러
  children?: React.ReactNode // 커스텀 버튼
  isCustomButton?: boolean // 커스텀 버튼 노출 여부
  propsStyle?: object // 스타일 커스텀
}

function CloseButton ({ onPress }: { onPress: () => void }): React.JSX.Element {
  return (
    <IconButton onPress={onPress} style={styles.iconButton}>
      <Icon name="closecircleo" size={16}/>
    </IconButton>
  )
}

export function InputForm ({ onChangeText, ...props }: InputFormProps): React.JSX.Element {
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
          <Input
            value={value}
            onChangeText={handleTextChange}
            isSecure={isSecure}
            onFocus={() => { setIsFocus(true) }}
            onBlur={() => {
              setIsFocus(value !== undefined && value.length > 0)
            }}
            customStyle={ styles.input }
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
    minHeight: 60,
    paddingLeft: 18,
    paddingTop: 21,
    paddingBottom: 21

  },
  positionRelative: { position: 'relative' },
  placeholder: {
    position: 'absolute',
    left: 18,
    top: 10,
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

export default InputForm
