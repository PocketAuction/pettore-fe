import { type Iresponse } from '@/api'

export interface IloginResponse extends Iresponse {
  data: {
    accessToken: string
    refreshToken: string
  }
}
