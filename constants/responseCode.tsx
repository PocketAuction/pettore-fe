import * as msgCode from './msg'

const code = {
  S0000: msgCode.msg.success,
  S0001: msgCode.msg.loginSuccess,
  S0100: msgCode.errorMsg.notCreateUser,
  S0200: msgCode.msg.isIdSuccess,
  S0300: msgCode.msg.isNickSuccess,
  S0101: msgCode.errorMsg.idOrPasswordNotMatching,
  S0201: msgCode.errorMsg.isIdCheckFail,
  S0301: msgCode.errorMsg.isNickCheckFail,
  F0000: msgCode.errorMsg.fail,
  F0401: msgCode.errorMsg.authentication,
  F9000: msgCode.errorMsg.isIdCheckFail,
  F9001: msgCode.errorMsg.idOrPasswordNotMatching,
  F9002: msgCode.errorMsg.emptyPassword,
  F9003: msgCode.errorMsg.loginFail,
  emptyId: msgCode.errorMsg.emptyId,
  emptyPassword: msgCode.errorMsg.emptyPassword,
  notDuplicationId: msgCode.errorMsg.notDuplicationId,
  emptyBirth: msgCode.errorMsg.emptyBirth,
  emptyPhone: msgCode.errorMsg.emptyPhone,
  agreeAgeEssential: msgCode.errorMsg.agreeAgeEssential,
  agreeServiceEssential: msgCode.errorMsg.agreeServiceEssential,
  agreeInfoCollectionEssential: msgCode.errorMsg.agreeInfoCollectionEssential,
  notSamePassword: msgCode.errorMsg.notSamePassword,
  emptyName: msgCode.errorMsg.emptyName,
  emptyEmail: msgCode.errorMsg.emptyEmail,
  emptyNickname: msgCode.errorMsg.emptyNickname
}

export const successCode = ['S0000', 'S0001', 'S0200', 'S0300']
export const failCode = ['S0101', 'S0201', 'S0301', 'F0000', 'F0401']

export default code
