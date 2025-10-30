import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import filter from 'leo-profanity'

import App from './components/App'
import store from './store'
import initSocket from './client'
import initI18next from './i18next'

initSocket(store)
const i18n = initI18next()

filter.add(filter.getDictionary('ru'));
filter.add(filter.getDictionary('en'));

const mountNode = document.querySelector('#chat')
const root = ReactDOM.createRoot(mountNode)
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
);
