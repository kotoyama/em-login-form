import { api } from '~/shared/api'

export async function mockFetch(url: string, options?: RequestInit) {
  if (!navigator.onLine) {
    throw new Error('Нет интернет-соединения')
  }

  const handler = api[url as keyof typeof api]

  const body = options?.body ? JSON.parse(options.body as string) : {}
  const response = await handler(body)

  return new Response(JSON.stringify(response), {
    status: response.status,
    statusText: response.message,
    headers: { 'Content-Type': 'application/json' },
  })
}
