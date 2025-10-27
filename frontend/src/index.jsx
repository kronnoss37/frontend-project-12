import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'

import App from './components/App'
import store from './store'
import initSocket from './client'
import initI18next from './i18next'

initSocket(store)
initI18next()

const mountNode = document.querySelector('#chat')
const root = ReactDOM.createRoot(mountNode)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
