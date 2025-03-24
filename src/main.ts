import { renderSignInForm } from '~/features/sign-in'
import '~/shared/ui/styles/index.css'

function bootstrap() {
  const appContainer = document.getElementById('app')

  if (!appContainer) {
    console.error('App element not found')
    return
  }

  renderSignInForm(appContainer!)
}

try {
  bootstrap()
} catch (error) {
  document.addEventListener('DOMContentLoaded', bootstrap)
}
