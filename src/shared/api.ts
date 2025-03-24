type ApiResponse = {
  status: number
  message: string
}

type ApiEndpoints = {
  [key: string]: (body: any) => Promise<ApiResponse>
}

export type AuthCredentials = {
  email: string
  password: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const api: ApiEndpoints = {
  '/api/login': async (credentials: AuthCredentials) => {
    // симулируем задержку
    await delay(1500)

    // симулируем серверную ошибку
    if (Math.random() < 0.2) {
      return { status: 500, message: 'Internal server error' }
    }

    if (
      credentials.email === 'test@test.com' &&
      credentials.password === 'password'
    ) {
      return { status: 200, message: 'OK' }
    }

    return { status: 401, message: 'Unauthorized' }
  },
}
