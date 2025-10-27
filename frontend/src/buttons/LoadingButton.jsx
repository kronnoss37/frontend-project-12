import React from 'react'
import { Button } from 'react-bootstrap'

const LoadingButton = ({ isVisuallyHidden = false, variant = 'primary', spinnerColor = '' }) => {
  return (
    <Button variant={variant} type="button" disabled>
      <span className={`spinner-border spinner-border-sm ${spinnerColor}`} aria-hidden="true"></span>
      {' '}
      <span role="status" className={isVisuallyHidden ? 'visually-hidden' : ''}>Загрузка...</span>
    </Button>
  )
}

export default LoadingButton
