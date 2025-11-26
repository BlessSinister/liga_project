import * as yup from 'yup';

export const EditSchema = yup.object({
  name: yup.string().required('Name is required'),
  info: yup.string().required('Info is required'),
  isImportant: yup.boolean(),
  isCompleted: yup.boolean(),
});
