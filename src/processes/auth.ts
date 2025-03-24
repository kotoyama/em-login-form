import { mockFetch } from '~/lib/fetch'
import { AuthCredentials } from '~/shared/api'

export class AuthProcess {
  static async signIn(credentials: AuthCredentials) {
    const response = await mockFetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    if (response instanceof Error) {
      throw response
    }

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error('Неверная почта или пароль')
        case 500:
          throw new Error('Внутренняя ошибка сервера')
        default:
          throw new Error('Неизвестная ошибка')
      }
    }

    return response.json()
  }
}
