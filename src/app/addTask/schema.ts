import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Поле обязательно для заполнения')
    .min(2, 'Необходимо минимум 2 символа в поле Task name'),
  info: yup
    .string()
    .trim()
    .required('Поле обязательно для заполнения')
    .min(2, 'Необходимо минимум 2 символа в поле Description'),
  isImportant: yup.boolean(),
});
