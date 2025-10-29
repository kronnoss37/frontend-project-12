import React from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

const LoadingButton = ({ isVisuallyHidden = false, variant = 'primary', spinnerColor = '' }) => {
  const { t } = useTranslation()

  return (
    <Button variant={variant} type="button" disabled>
      <span className={`spinner-border spinner-border-sm ${spinnerColor}`} aria-hidden="true"></span>
      {' '}
      <span role="status" className={isVisuallyHidden ? 'visually-hidden' : ''}>{t('loadingButton.status')}</span>
    </Button>
  )
}

export default LoadingButton
