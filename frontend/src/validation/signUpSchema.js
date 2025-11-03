import * as yup from 'yup'

const initSignUpSchema = t => (
  yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(t('controlErrors.requiredField'))
      .min(3, t('controlErrors.fieldLength'))
      .max(20, t('controlErrors.fieldLength')),
    password: yup
      .string()
      .trim()
      .required(t('controlErrors.requiredField'))
      .min(6, t('controlErrors.minPasswordSymbols')),
    confirmPassword: yup
      .string()
      .trim()
      .required(t('controlErrors.requiredField'))
      .oneOf([yup.ref('password')], t('controlErrors.identicalPasswords')),
  }))

export default initSignUpSchema;