import * as yup from 'yup';

export const EditSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Необходимо минимум 2 символа в поле Name'),
  info: yup.string().required('Info is required').min(2, 'Необходимо минимум 2 символа в поле Info'),
  isImportant: yup.boolean(),
  isCompleted: yup.boolean(),
});
