import React, { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'

// components
import Input from '@/components/atoms/Input'
import FlatButton from '@/components/atoms/FlatButton'

// api
import { createUser, type IloginParams, signUpDuplicationCheck, type IsignUpDuplicationCheckProps } from '@/api'

// store
import { useAtomValue, useSetAtom } from 'jotai'
import { convertUrlQueryString, upperCaseSocialLoginType } from '@/store/auth'

// customhooks
import useCustomNavigation from '@/customhooks/useCustomNavigation'

// style
import Step from '@/components/organisms/Step'
import { Colors } from '@/constants/styles'
import Checkbox from '@/components/atoms/Checkbox'
import { failCode, successCode } from '@/constants/responseCode'
import { toastAtom } from '@/store/common'
import useToast from '@/customhooks/useToast'
import { convertResponseCodeToMsg, isSuccessApiCall } from '@/util/common'
import useLoading from '@/customhooks/useLoading'

function SignupScreen (): React.JSX.Element {
  const queryString = useAtomValue(convertUrlQueryString)
  const setToastInfo = useSetAtom(toastAtom)

  const { navigation } = useCustomNavigation()
  const { showLoading, hideLoading } = useLoading()

  const [currentSetp, setCurrentStep] = useState(1)

  // form 데이터
  const [signUpData, setSignUpData] = useState({
    id: { value: '', errorCode: '', successCode: '' },
    password: { value: '', errorCode: '' },
    passwordConfirm: { value: '', errorCode: '' },
    name: { value: '', errorCode: '' },
    email: { value: '', errorCode: '' },
    nickname: { value: '', errorCode: '', successCode: '' },
    birthDay: { value: '', errorCode: '' },
    phone: { value: '', errorCode: '' },
    agreeAll: { value: false, errorCode: '' },
    agreeAge: { value: false, errorCode: '' },
    agreeService: { value: false, errorCode: '' },
    agreeInfoCollection: { value: false, errorCode: '' },
    agreeCustomizeService: { value: false, errorCode: '' },
    agreeReciveInfo: { value: false, errorCode: '' }
  })

  // 중복체크
  const [isIdDuplication, setIdDuplication] = useState(false)
  const [isNickNameDuplication, setNickNameDuplication] = useState(false)

  // atom
  const socialLoginType = useAtomValue(upperCaseSocialLoginType)

  // custom hook
  const { onOpenToast } = useToast()

  // 소셜로그인 여부
  const isNotSocialLogin = socialLoginType === 'LOCAL'
  const handleSignUpData = (key: keyof typeof signUpData, value: string): void => {
    setSignUpData((prevSignUpData) => ({
      ...prevSignUpData,
      [key]: {
        value,
        errorCode: ''
      }
    }))

    duplicationCheckClear(key)
  }

  // 중복확인 초기화
  const duplicationCheckClear = (key: string): void => {
    const duplicationMap = {
      id: () => { setIdDuplication(false) },
      nickname: () => { setNickNameDuplication(false) }
    }

    if (key === 'id' || key === 'nickname') {
      duplicationMap[key]()
    }
  }

  // 다음 버튼 눌렀을때 실행함수
  const handleStep = async (): Promise<void> => {
    const stepValidationMap: Array<Array<{ key: keyof typeof signUpData, errorCode: string, isValidation: boolean }>> = [
      [
        { key: 'agreeAge', errorCode: 'agreeAgeEssential', isValidation: !signUpData.agreeAge.value },
        { key: 'agreeService', errorCode: 'agreeServiceEssential', isValidation: !signUpData.agreeService.value },
        { key: 'agreeInfoCollection', errorCode: 'agreeInfoCollectionEssential', isValidation: !signUpData.agreeInfoCollection.value }
      ],
      [
        { key: 'name', errorCode: 'emptyName', isValidation: signUpData.name.value === '' },
        { key: 'birthDay', errorCode: 'emptyBirth', isValidation: signUpData.birthDay.value === '' },
        { key: 'phone', errorCode: 'emptyPhone', isValidation: signUpData.phone.value === '' }
      ],
      [
        { key: 'email', errorCode: 'emptyEmail', isValidation: signUpData.email.value === '' },
        { key: 'nickname', errorCode: 'emptyNickname', isValidation: signUpData.nickname.value === '' }
      ],
      [
        { key: 'id', errorCode: 'notDuplicationId', isValidation: !isIdDuplication },
        { key: 'id', errorCode: 'emptyId', isValidation: signUpData.id.value === '' },
        { key: 'password', errorCode: signUpData.password !== signUpData.passwordConfirm ? 'notSamePassword' : 'emptyPassword', isValidation: signUpData.password.value === '' && signUpData.password !== signUpData.passwordConfirm },
        { key: 'passwordConfirm', errorCode: signUpData.password !== signUpData.passwordConfirm ? 'notSamePassword' : 'emptyPasswordConfirm', isValidation: signUpData.passwordConfirm.value === '' && signUpData.password !== signUpData.passwordConfirm }
      ]
    ]

    if (!isNotSocialLogin) stepValidationMap.pop()

    if (validation(stepValidationMap[currentSetp - 1])) {
      if (currentSetp === stepValidationMap.length) {
        await handleSignup()
      } else {
        setCurrentStep(currentSetp + 1)
      }
    }
  }
  // 회원가입 유효성 체크
  const validation = (validationList: Array<{ key: keyof typeof signUpData, errorCode: string, isValidation: boolean }>): boolean => {
    const isValidation = validationList.every((validationItem) => !validationItem.isValidation)
    const isAgree = validationList[0].key.includes('agree')

    validationList.forEach((item) => {
      const isError = item.isValidation

      setSignUpData((prevSetSignUpData) => ({
        ...prevSetSignUpData,
        [item.key]: {
          value: prevSetSignUpData[item.key].value,
          errorCode: isError ? item.errorCode : ''
        }
      }))
    })

    // 필수 약관은 에러 노출방식이 달라서 따로 처리
    if (isAgree && !isValidation) onOpenToast({ is: true, msg: '필수 약관에 동의해주세요.', type: 'ERROR' })

    return isValidation
  }

  const handleCheckbox = (isSelect: boolean, key: string): void => {
    // 첫글자만 대글자로 치환
    const checkboxKey = `agree${key.charAt(0).toUpperCase() + key.slice(1)}`

    if (key === 'all') {
      setSignUpData((prevSignUpData) => ({
        ...prevSignUpData,
        agreeAll: { value: !(prevSignUpData[checkboxKey as keyof typeof signUpData].value as boolean), errorCode: '' },
        agreeAge: { value: isSelect, errorCode: '' },
        agreeService: { value: isSelect, errorCode: '' },
        agreeInfoCollection: { value: isSelect, errorCode: '' },
        agreeCustomizeService: { value: isSelect, errorCode: '' },
        agreeReciveInfo: { value: isSelect, errorCode: '' }
      }))
    } else {
      setSignUpData((prevSignUpData) => ({
        ...prevSignUpData,
        [checkboxKey]: { value: !(prevSignUpData[checkboxKey as keyof typeof signUpData].value as boolean), errorCode: '' }
      }))
    }
  }

  // 회원가입
  const handleSignup = async (): Promise<void> => {
    const param = {
      id: signUpData.id.value,
      password: signUpData.password.value,
      name: signUpData.name.value,
      email: signUpData.email.value,
      nickname: signUpData.nickname.value,
      birthDay: signUpData.birthDay.value,
      phone: signUpData.phone.value,
      social: socialLoginType
    }

    try {
      showLoading()

      const response = await createUser(param as IloginParams)
      if (isSuccessApiCall(response.code)) {
        navigation.navigate('Index', { screen: 'Home' })
        setToastInfo({ is: true, msg: convertResponseCodeToMsg(response.code), type: 'success' })
      } else {
        setToastInfo({ is: true, msg: convertResponseCodeToMsg(response.code), type: 'error' })
      }
    } catch (e) {
      hideLoading()
      throw new Error(`handleSignup : ${e}`)
    } finally {
      hideLoading()
    }

  }

  // 중복체크
  const checkDuplication = async (param: { flag: 'ID' | 'NICKNAME' }): Promise<void> => {
    const key = param.flag.toLowerCase()
    const duplicationMap = {
      ID: () => { setIdDuplication(true) },
      NICKNAME: () => { setNickNameDuplication(true) }
    }
    const params = {
      type: param.flag,
      duplicationData: {
        [param.flag.toLowerCase()]: signUpData[param.flag.toLowerCase() as keyof typeof signUpData].value
      }
    }
    const response = await signUpDuplicationCheck(params as IsignUpDuplicationCheckProps)

    duplicationMap[param.flag]()

    if (response !== null && response !== undefined) {
      setSignUpData((prevSignUpData) => {
        return {
          ...prevSignUpData,
          [key]: {
            value: prevSignUpData[key as keyof typeof signUpData].value,
            errorCode: failCode.includes(response.code.toString()) ? response.code : '',
            successCode: successCode.includes(response.code.toString()) ? response.code : ''
          }
        }
      })
    }
  }

  useLayoutEffect(() => {
    if (queryString !== null) {
      const { email, name } = queryString
      handleSignUpData('email', email)
      handleSignUpData('name', name)
    }
  }, [queryString])

  return (
    <ScrollView style={styled.container}>
      <Step currentStep={currentSetp} title="본인인증" stepHandler={async () => { await handleStep() }}>
        <View>
          <Checkbox isSelect={signUpData.agreeAll.value} onChange={(is) => { handleCheckbox(is, 'all') }}>모두 동의하기</Checkbox>
          <View style={styled.divider}></View>
          <Checkbox style={{ marginBottom: 30 }} isSelect={signUpData.agreeAge.value} onChange={(is) => { handleCheckbox(is, 'age') }}><Text style={{ color: Colors.primary }}>(필수)</Text> 만 14세 이상입니다.</Checkbox>
          <Checkbox style={{ marginBottom: 30 }} isSelect={signUpData.agreeService.value} onChange={(is) => { handleCheckbox(is, 'service') }}><Text style={{ color: Colors.primary }}>(필수)</Text> 서비스 이용약관 동의</Checkbox>
          <Checkbox style={{ marginBottom: 30 }} isSelect={signUpData.agreeInfoCollection.value} onChange={(is) => { handleCheckbox(is, 'infoCollection') }}><Text style={{ color: Colors.primary }}>(필수)</Text> 개인정보 수집 및 이용 동의</Checkbox>
          <Checkbox style={{ marginBottom: 30 }} isSelect={signUpData.agreeCustomizeService.value} onChange={(is) => { handleCheckbox(is, 'customizeService') }}>개인 맞춤형 서비스 활용 동의</Checkbox>
          <Checkbox style={{ marginBottom: 30 }} isSelect={signUpData.agreeReciveInfo.value} onChange={(is) => { handleCheckbox(is, 'reciveInfo') }}>광고성 정보 수신 및 마케팅 활용 동의</Checkbox>
        </View>
        <View>
          <Input placeholder="이름" onChangeText={(data) => { handleSignUpData('name', data) }} value={signUpData.name.value} errorCode={signUpData.name.errorCode}/>
          <Input placeholder="생년월일" onChangeText={(data) => { handleSignUpData('birthDay', data) }} value={signUpData.birthDay.value} errorCode={signUpData.birthDay.errorCode}/>
          <Input placeholder="휴대폰번호" onChangeText={(data) => { handleSignUpData('phone', data) }} value={signUpData.phone.value} errorCode={signUpData.phone.errorCode}/>
        </View>
        <View>
          <Input placeholder="이메일" onChangeText={(data) => { handleSignUpData('email', data) }} value={signUpData.email.value} errorCode={signUpData.email.errorCode}/>
          <Input
            placeholder="닉네임"
            onChangeText={(data) => { handleSignUpData('nickname', data) }}
            value={signUpData.nickname.value}
            errorCode={signUpData.nickname.errorCode}
            successCode={signUpData.nickname.successCode}
            isCustomButton={true}
          >
            <FlatButton
              onPress={async () => { await checkDuplication({ flag: 'NICKNAME' }) }}
              resetStyle={true}
              propStyle={styled.greenButton}
              disabled={isNickNameDuplication || signUpData.nickname.value === ''}
            >중복확인</FlatButton>
          </Input>
        </View>
        {
          isNotSocialLogin && (
            <View>
              <Input
                placeholder="아이디"
                onChangeText={(data) => { handleSignUpData('id', data) }}
                value={signUpData.id.value}
                errorCode={signUpData.id.errorCode}
                successCode={signUpData.id.successCode}
                isCustomButton={true}
              >
                <FlatButton
                  onPress={async () => { await checkDuplication({ flag: 'ID' }) }}
                  resetStyle={true}
                  propStyle={styled.greenButton}
                  disabled={isIdDuplication || signUpData.id.value === ''}
                >중복확인</FlatButton>
              </Input>
              <Input placeholder="비밀번호" onChangeText={(data) => { handleSignUpData('password', data) }} isSecure value={signUpData.password.value} errorCode={signUpData.password.errorCode}/>
              <Input placeholder="비밀번호 확인" onChangeText={(data) => { handleSignUpData('passwordConfirm', data) }} isSecure value={signUpData.passwordConfirm.value} errorCode={signUpData.passwordConfirm.errorCode}/>
            </View>
          )
        }
      </Step>
    </ScrollView>
  )
}

export default SignupScreen

const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  greenButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 33,
    lineHeight: 30,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 0,
    overflow: 'hidden'
  },
  divider: {
    height: 1,
    backgroundColor: Colors.black05,
    marginVertical: 20
  }
})
