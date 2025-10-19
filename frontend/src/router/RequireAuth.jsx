import React from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

const RequireAuth = ({ children }) => {
  const isAuth = useSelector(state => state.authData.isAuth)

  if (!isAuth) return <Navigate to="/login" replace />

  return (
    <>
      {children}
    </>
  )
}

export default RequireAuth
