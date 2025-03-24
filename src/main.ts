import '~/shared/ui/styles/index.css'
import { renderSignInForm } from '~/features/sign-in'

function bootstrap() {
  const appContainer = document.getElementById('app')

  if (!appContainer) {
    console.error('App element not found')
    return
  }

  renderSignInForm(appContainer)
}

try {
  bootstrap()
} catch (error) {
  document.addEventListener('DOMContentLoaded', bootstrap)
}
