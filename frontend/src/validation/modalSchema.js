import * as yup from 'yup';

const initModalShema = (t, channels) =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('controlErrors.requiredField'))
      .min(3, t('controlErrors.fieldLength'))
      .max(20, t('controlErrors.fieldLength'))
      .notOneOf(channels, t('controlErrors.uniqueField')),
  });

export default initModalShema;
