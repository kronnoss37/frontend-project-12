import React from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Image } from 'react-bootstrap'

import notFoundPicture from '../assets/notfound.svg'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <Image src={notFoundPicture} fluid className="h-25" alt={t('notFoundPage.notFoundText')} />
      <h1 className="h4 text-muted">{t('notFoundPage.notFoundText')}</h1>
      <p className="text-muted">
        {t('notFoundPage.description')}
        {' '}
        <Link to="/">{t('notFoundPage.mainPageText')}</Link>
      </p>
    </div>
  )
}

export default NotFoundPage
