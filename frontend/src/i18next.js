import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import resources from './locales/index'

const initI18next = () => {
  const i18n = i18next.createInstance()
  const options = {
    resources,
    debug: false,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  }
  i18n.use(initReactI18next).init(options)
}

export default initI18next
