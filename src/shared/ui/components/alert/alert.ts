import styles from './alert.module.css'

export type AlertProps = {
  type?: 'info' | 'success' | 'error'
  message: string
  className?: string
}

export function createAlert(props: AlertProps) {
  const { type = 'info', message, className } = props

  const alert = document.createElement('div')

  const emoji = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
  }

  alert.textContent = `${emoji[type]} ${message}`
  alert.className = [styles.alert, className].filter(Boolean).join(' ')
  alert.role = type === 'error' ? 'alert' : 'status'

  alert.setAttribute('data-type', type)

  return alert
}
