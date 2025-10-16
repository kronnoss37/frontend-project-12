import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router';

import App from './components/App'

const mountNode = document.querySelector('#chat')
const root = ReactDOM.createRoot(mountNode)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)