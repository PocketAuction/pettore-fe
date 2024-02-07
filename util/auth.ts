import { type userType } from '@/constants/type/commonType'

export async function createUser (params: userType): Promise<number> {
  console.log('createUser', params)
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(200)
    }, 100)
  })
}

export function login ({ email, password }: userType): void {
  console.log('login', email, password)
}

export default {
  createUser,
  login
}
