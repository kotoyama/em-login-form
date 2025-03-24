import { createTextInput, TextInputProps } from '../text-input'
import styles from './password-input.module.css'

export type PasswordInputProps = TextInputProps

export function createPasswordInput(props: PasswordInputProps) {
  const wrapper = document.createElement('div')

  wrapper.className = styles.inputWrapper

  let isVisible = false

  const textInput = createTextInput({
    ...props,
    type: 'password',
  })

  const toggleButton = document.createElement('button')

  toggleButton.type = 'button'
  toggleButton.className = [styles.toggleButton, props.className]
    .filter(Boolean)
    .join(' ')

  toggleButton.setAttribute('aria-controls', props.id)

  const updateVisibility = () => {
    textInput.element.type = isVisible ? 'text' : 'password'
    toggleButton.textContent = isVisible ? '🔒' : '👁️'

    toggleButton.setAttribute('aria-pressed', isVisible.toString())
    toggleButton.setAttribute(
      'aria-label',
      isVisible ? 'Скрыть пароль' : 'Показать пароль',
    )
  }

  toggleButton.addEventListener('click', (e) => {
    e.preventDefault()
    isVisible = !isVisible
    updateVisibility()
    textInput.element.focus()
  })

  wrapper.append(textInput.element, toggleButton)

  updateVisibility()

  return {
    element: wrapper,
    inputElement: textInput.element,
  }
}
