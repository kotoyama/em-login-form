import styles from './text-input.module.css'

export type TextInputProps = {
  id: string
  name: string
  type?: string
  autocomplete?: AutoFill
  className?: string
}

export function createTextInput(props: TextInputProps) {
  const { id, name, type = 'text', autocomplete, className } = props

  const input = document.createElement('input')

  input.id = id
  input.name = name
  input.type = type
  input.className = [styles.input, className].filter(Boolean).join(' ')

  if (autocomplete) input.autocomplete = autocomplete

  return {
    element: input,
    inputElement: input,
  }
}
