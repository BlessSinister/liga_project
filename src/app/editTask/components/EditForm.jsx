import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetTasksQuery, useUpdateTaskMutation } from '../../../api/tasksApi';
import { EditSchema } from './schema';
import { EditFormInterface } from './EditForm.types';
import styles from './EditForm.module.css';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { PageContainer } from 'components/PageContainer';

export default function EditForm({ id }) {
  const [updateTask] = useUpdateTaskMutation();
  const { refetch } = useGetTasksQuery();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditSchema),
    defaultValues: {
      name: '',
      info: '',
      isImportant: false,
      isCompleted: false,
    },
  });
  const onSubmit = async (data) => {
    console.log({ id, body: data });
    try {
      await updateTask({ id, body: data }).unwrap();
      console.log('Updated!', data);
      reset();
      refetch();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <PageContainer>
      <h1>Edit task</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField label="Name" placeholder="Edit task name" {...field} />}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <Controller
          name="info"
          control={control}
          render={({ field }) => <TextField label="Info" placeholder="Edit info about task" {...field} />}
        />
        {errors.info && <p className={styles.error}>{errors.info.message}</p>}

        <Controller
          name="isImportant"
          control={control}
          render={({ field }) => (
            <Checkbox label="Important" checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />
          )}
        />

        <Controller
          name="isCompleted"
          control={control}
          render={({ field }) => (
            <Checkbox label="Completed" checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />
          )}
        />

        <button type="submit" className="btn btn-secondary d-block ml-auto">
          Edit task
        </button>
      </form>
    </PageContainer>
  );
}
