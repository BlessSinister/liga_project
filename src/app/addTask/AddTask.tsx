import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Link } from 'react-router-dom';
import { useAddTaskMutation, useGetTasksQuery } from '../../api/tasksApi';
import { Checkbox } from '../../components/Checkbox';
import { PageContainer } from '../../components/PageContainer';
import { TextField } from '../../components/TextField';
import { schema } from './schema';
import { AddFormInterface } from './AddForm.types';
import styles from './AddTask.module.css';

export default function AddTask() {
  const { refetch } = useGetTasksQuery(undefined);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddFormInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      info: '',
      isImportant: false,
    },
  });

  const [addTask] = useAddTaskMutation();

  const onSubmit = async (data: AddFormInterface) => {
    console.log('Submitting:', data);
    try {
      await addTask(data).unwrap();
      refetch();
      console.log('Success:', data);
      reset();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <PageContainer>
      <Link to="/" className="btn btn-info">
        Back
      </Link>
      <h1>TODO LIST | ADD TASK</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField label="Task name" placeholder="Clean room" {...field} />}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        <Controller
          name="info"
          control={control}
          render={({ field }) => <TextField label="What to do (description)" placeholder="Clean my room" {...field} />}
        />
        {errors.info && <p className={styles.error}>{errors.info.message}</p>}

        <Controller
          name="isImportant"
          control={control}
          render={({ field }) => (
            <Checkbox label="Important" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
          )}
        />
        <button type="submit" className="btn btn-secondary d-block ml-auto">
          Add task
        </button>
      </form>
    </PageContainer>
  );
}
