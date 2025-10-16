import React from 'react'
import { Navigate } from 'react-router'

const RequireAuth = ({ children }) => {

  const auth = true

  if(!auth) return <Navigate to='/login' replace/>

  return (
    <>
      {children}
    </>
  );
}

export default RequireAuth