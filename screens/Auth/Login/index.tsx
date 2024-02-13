// react
import React, { useState, useEffect, useCallback } from 'react'
// react native
import { View, Text, Image, ScrollView, Pressable } from 'react-native'
// expo
import * as Linking from 'expo-linking'

// store
import { useSetAtom } from 'jotai'

// style
import styles from './styles'

// store
import { socialLoginType, urlQueryString } from '@/store/auth'

// constants
import { loginInfoMap, type loginInfoMapValueType } from '@/constants/login'
import { type AuthStackParamList } from '@/constants/type/navigationType'

// util
import {
  convertResponseCodeToMsg,
  getDeviceSize,
  isSuccessApiCall,
  linking,
  setToken
} from '@/util/common'

// components

import { InputForm } from '@/components/molecules/InputForm'
import Row from '@/components/atoms/Row'
import Col from '@/components/atoms/Col'
import FlatButton from '@/components/atoms/FlatButton'
import useCustomNavigation from '@/customhooks/useCustomNavigation'
import { login } from '@/api'
import useLoading from '@/customhooks/useLoading'
import useToast from '@/customhooks/useToast'

export default function LoginScreen (): React.JSX.Element {
  const { navigation } = useCustomNavigation()
  const setUrlAtom = useSetAtom(urlQueryString)
  const [id, setId] = useState<string>('')
  const [idErrorCode, setIdErrorCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordErrorCode, setPasswordErrorCode] = useState<string>('')

  // jotai
  const { onOpenToast } = useToast()
  const { showLoading, hideLoading } = useLoading()

  const handleLoading = (flag: 'SHOW' | 'HIDE'): void => {
    const map = {
      SHOW: () => { showLoading() },
      HIDE: () => { hideLoading() }
    }

    map[flag]()
  }

  const resetData = (): void => {
    setId('')
    setPassword('')
    setIdErrorCode('')
    setPasswordErrorCode('')
  }

  // 로그인 함수
  const loginHandler = async (): Promise<void> => {
    // validation 체크
    if (!validation()) return

    const params = {
      id, password
    }

    // 로딩 시작
    handleLoading('SHOW')

    try {
      const response = await login(params)

      if (isSuccessApiCall(response.code)) {
        await setToken(response.data.accessToken, response.data.refreshToken)
        navigation.navigate('Index', { screen: 'Home' })
        resetData()
        onOpenToast({ is: true, type: 'INFO', msg: convertResponseCodeToMsg('S0001') })
      } else {
        onOpenToast({ is: true, type: 'INFO', msg: convertResponseCodeToMsg(response.code) })
      }
    } catch (e) {
      // 로딩 종료
      handleLoading('HIDE')
      onOpenToast({ is: true, type: 'INFO', msg: convertResponseCodeToMsg('F9003') })
    } finally {
      // 로딩 종료
      handleLoading('HIDE')
    }
  }

  const validation = (): boolean => {
    if (id.length === 0 && password.length === 0) {
      setIdErrorCode('emptyId')
      setPasswordErrorCode('F9001')
    }
    if (id.length === 0) {
      setIdErrorCode('emptyId')
      return false
    }
    if (password.length === 0) {
      setPasswordErrorCode('emptyPassword')
      return false
    }

    setIdErrorCode('')
    setPasswordErrorCode('')
    return true
  }

  const handleUrl = useCallback((url: string) => {
    setUrlAtom(url)
  }, [setUrlAtom])

  const resetTextHandler = (id: 'id' | 'password'): void => {
    const resetTextHandlerMap = {
      id: () => { setId('') },
      password: () => { setPassword('') }
    }

    resetTextHandlerMap[id]()
  }

  const handleInput = ({ flag, value }: { flag: 'id' | 'password', value: string }): void => {
    const handleInputMap = {
      id: () => { setId(value) },
      password: () => { setPassword(value) }
    }

    handleInputMap[flag]()
    clearErrorCode(flag)
  }

  const clearErrorCode = (flag: 'id' | 'password'): void => {
    const clearErrorCodeMap = {
      id: () => { setIdErrorCode('') },
      password: () => { setPasswordErrorCode('') }
    }

    clearErrorCodeMap[flag]()
  }

  useEffect(() => {
    // 로그인 성공시 parameter를 얻기 위해 url 감시
    Linking.addEventListener('url', (params) => { handleUrl(params.url) })
  }, [handleUrl])

  return (
    <ScrollView style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      <View style={[styles.container, { height: getDeviceSize('H') }]}>
        <View style={styles.loginContainer}>
          {/* top */}
          <View>
            <Text style={styles.title}>펫토레</Text>
          </View>
          {/* middle */}
          <View>
            <InputForm
              placeholder="아이디"
              onChangeText={(text: string) => { handleInput({ flag: 'id', value: text }) }}
              value={id}
              errorCode={idErrorCode}
              isResetButton={id.length > 0} resetHandler={() => { resetTextHandler('id') }}
              propsStyle={{ marginBottom: 10 }}
            />
            <InputForm
              placeholder="비밀번호"
              onChangeText={(text: string) => { handleInput({ flag: 'password', value: text }) }}
              value={password}
              isSecure
              errorCode={passwordErrorCode}
              isResetButton={password.length > 0} resetHandler={() => { resetTextHandler('password') }}
            />
            <FlatButton onPress={async () => { await loginHandler() }}>로그인</FlatButton>

            {/* 아이디, 패스워드 찾기, 회원가입 */}
            <AuthComponent />
          </View>
          {/* 소셜로그인 */}
          <SocialLoginComponent />
        </View>
      </View>
    </ScrollView>
  )
}

function AuthComponent (): React.JSX.Element {
  const { navigation } = useCustomNavigation()
  const handleNavigate = (name: 'findId' | 'findPwd' | 'signUp'): void => {
    const navigationMap = {
      findId: { routeName: 'Find', params: { flag: 'id' } },
      findPwd: { routeName: 'Find', params: { flag: 'pwd' } },
      signUp: { routeName: 'Create', params: undefined }
    }

    if (name === 'findId' || name === 'findPwd' || name === 'signUp') {
      navigation.navigate(navigationMap[name].routeName as keyof AuthStackParamList, navigationMap[name].params as never)
    }
  }

  return (
    <View style={styles.rowCenter}>
      <Row propsStyle={styles.bottomsItems}>
        <Col><Text style={styles.textCenter} onPress={() => {}}>아이디 찾기</Text></Col>
        <Col><Text style={styles.textCenter} onPress={() => {}}>비밀번호 찾기</Text></Col>
        <Col><Text style={styles.textCenter} onPress={() => { handleNavigate('signUp') }}>회원가입</Text></Col>
      </Row>
    </View>
  )
}

function SocialLoginComponent (): React.JSX.Element {
  const setSocialLoginTypeAtom = useSetAtom(socialLoginType)
  const handleLinking = (item: loginInfoMapValueType, key: string): void => {
    // const deepLink = await getInitialDeepLink();
    setSocialLoginTypeAtom(key) // 로그인 타입 확인

    console.log('item.link', item.link + '?url=exp://172.25.108.114:8082/--')

    linking(item.link + '?url=exp://172.25.108.114:8082/--') // 소셜로그인 링크 이동
  }

  return (
    <View style={styles.bottomItemContainer}>
      <Text style={[styles.textCenter, styles.mb20]}>SNS 계정으로 로그인하기</Text>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 30 }}>
        {
          Object.keys(loginInfoMap).map(key => {
            const item = loginInfoMap[key]
            return (
              <Pressable onPress={() => { handleLinking(item, key) }} style={item.propStyle} key={key}>
                <Image source={item.logo} style={item.imageStyle}/>
              </Pressable>
            )
          })
        }
      </View>
    </View>
  )
}
