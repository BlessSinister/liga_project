import * as yup from 'yup';

export const schema = yup.object().shape({
  value: yup.string().trim().min(2, 'Необходимо минимум 2 символа в поле Search для поиска'),
});
