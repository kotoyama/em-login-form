import { Schema } from 'zod'

import { createTextInput, TextInputProps } from '../text-input/index.js'
import { createPasswordInput } from '../password-input/index.js'
import styles from './form-input.module.css'

export type FormInputProps = TextInputProps & {
  label: string
  error?: string
  required?: boolean
  schema?: Schema
  className?: string
}

export function createFormInput(config: FormInputProps) {
  const {
    id,
    type = 'text',
    label,
    error,
    required = false,
    schema,
    className,
    ...props
  } = config

  const container = document.createElement('div')
  container.className = [styles.container, className].filter(Boolean).join(' ')

  const labelElement = document.createElement('label')

  labelElement.htmlFor = id
  labelElement.textContent = label
  labelElement.className = styles.label

  const inputComponent =
    type === 'password'
      ? createPasswordInput({ id, ...props })
      : createTextInput({ id, type, ...props })
  const inputElement = inputComponent.inputElement

  inputElement.setAttribute('aria-required', required.toString())
  container.append(labelElement, inputComponent.element)

  const errorId = `${id}-error`
  let currentError: string | null = null

  const setErrorElement = (error?: string | null) => {
    if (error) {
      const errorElement = document.createElement('div')

      errorElement.id = errorId
      errorElement.className = styles.errorMessage
      errorElement.textContent = error

      errorElement.setAttribute('role', 'alert')
      errorElement.setAttribute('aria-live', 'polite')

      container.append(errorElement)
    } else {
      const errorElement = document.getElementById(errorId)

      if (errorElement) {
        errorElement.remove()
      }
    }
  }

  const setError = (error?: string | null) => {
    const hasError = !!error
    currentError = error ?? null

    if (hasError) {
      inputElement.setAttribute('aria-invalid', 'true')
      inputElement.setAttribute('aria-errormessage', errorId.toString())

      setErrorElement(error)
    } else {
      inputElement.setAttribute('aria-invalid', 'false')
      inputElement.removeAttribute('aria-errormessage')

      setErrorElement(null)
    }
  }

  const validate = () => {
    if (!schema) return true

    const result = schema.safeParse(inputElement.value)

    if (!result.success) {
      setError(result.error.errors[0].message)
      return false
    } else {
      setError(null)
      return true
    }
  }

  inputElement.addEventListener('input', () => {
    if (currentError) {
      setError(null)
    }
  })

  setError(error)

  return {
    element: container,
    inputElement,
    setError,
    validate,
  }
}
