import styles from './button.module.css'

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  text: string
  loading?: boolean
  disabled?: boolean
  variant?: 'primary'
  className?: string
}

export function createButton(props: ButtonProps) {
  const {
    text,
    type = 'button',
    variant = 'primary',
    loading,
    disabled,
    className,
  } = props

  const button = document.createElement('button')

  button.type = type
  button.textContent = text
  button.className = [styles.button, className].filter(Boolean).join(' ')

  button.setAttribute('data-variant', variant)

  const setLoading = (loading: boolean) => {
    button.disabled = loading
    button.setAttribute('data-loading', loading.toString())
    button.setAttribute('aria-busy', loading.toString())
  }

  if (disabled) {
    button.disabled = disabled
  }

  if (loading) {
    setLoading(true)
  }

  return {
    element: button,
    setLoading,
  }
}
