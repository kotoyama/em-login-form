import { z } from 'zod'

import { AuthProcess } from '~/processes/auth'
import { createFormInput } from '~/shared/ui/components/form-input'
import { createButton } from '~/shared/ui/components/button'
import { createAlert } from '~/shared/ui/components/alert'

import styles from './sign-in.module.css'

export function renderSignInForm(container: HTMLElement) {
  const formId = 'signInForm'

  container.className = styles.container
  container.innerHTML = `
    <div class=${styles.card}>
      <h1 class=${styles.title}>Вход</h1>
      <form id="${formId}" novalidate></form>
    </div>
  `

  const form = container.querySelector('form')!
  form.className = styles.form

  const fields = document.createElement('div')
  fields.className = styles.fields

  const emailInput = createFormInput({
    id: 'signInForm-email',
    type: 'email',
    name: 'email',
    label: 'Почта',
    autocomplete: 'email',
    required: true,
    // конечно, в реальности лучший способ валидации email - это отправка письма на этот ящик
    schema: z
      .string()
      .nonempty('Поле обязательно')
      .email('Неверный формат почты'),
  })

  const passwordInput = createFormInput({
    id: 'signInForm-password',
    type: 'password',
    name: 'password',
    label: 'Пароль',
    autocomplete: 'current-password',
    required: true,
    schema: z
      .string()
      .nonempty('Поле обязательно')
      .min(8, 'Пароль должен быть не менее 8 символов'),
  })

  const button = createButton({
    type: 'submit',
    text: 'Войти',
  })

  fields.append(emailInput.element, passwordInput.element)
  form.append(fields, button.element)

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    emailInput.setError(null)
    passwordInput.setError(null)

    const alerts = container.querySelectorAll(`.${styles.status}`)
    alerts.forEach((alert) => alert.remove())

    const isFormValid = [emailInput, passwordInput]
      .map((field) => field.validate())
      .every((result) => result)

    if (!isFormValid) return

    try {
      button.setLoading(true)
      button.element.textContent = 'Загрузка...'

      const response = await AuthProcess.signIn({
        email: emailInput.inputElement.value,
        password: passwordInput.inputElement.value,
      })

      if (response.status === 200) {
        const alert = createAlert({
          type: 'success',
          className: styles.status,
          message:
            'Вход выполнен успешно. Если бы это было реальное приложение, что-то бы произошло',
        })

        form.after(alert)
      }
    } catch (error) {
      const alert = createAlert({
        type: 'error',
        className: styles.status,
        message: (error as Error).message,
      })

      form.after(alert)
    } finally {
      button.setLoading(false)
      button.element.textContent = 'Войти'
    }
  })
}
