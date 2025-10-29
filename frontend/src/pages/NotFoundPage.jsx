import React from 'react'
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation()
  
  return <div className="text-danger">NotFoundPage</div>
}

export default NotFoundPage
