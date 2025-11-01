import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import filter from 'leo-profanity'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

import App from './components/App'
import store from './store'
import initSocket from './services/client'
import initI18next from './services/i18next'

initSocket(store)
const i18n = initI18next()

filter.add(filter.getDictionary('ru'))
filter.add(filter.getDictionary('en'))

const rollbarConfig = {
  accessToken: '0111a1874e4c4cb98e45293c6fc705df40cb3cbe70f5b8b940aad0062519b4859ed2ba38e4bebba352cebc2c3f84ae8f',
  environment: 'development',
}

const mountNode = document.querySelector('#chat')
const root = ReactDOM.createRoot(mountNode)
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </RollbarProvider>
    </I18nextProvider>
  </Provider>,
)
