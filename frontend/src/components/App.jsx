import React from 'react'
import { Routes, Route } from 'react-router'

import Layout from './Layout/Layout'
import ChatPage from '../pages/ChatPage'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import NotFoundPage from '../pages/NotFoundPage'
import RequireAuth from '../router/RequireAuth'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={(
            <RequireAuth>
              <ChatPage />
            </RequireAuth>
          )}
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
