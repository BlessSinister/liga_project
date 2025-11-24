import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAddTaskMutation } from '../../api/tasksApi';
import { Checkbox } from '../../components/Checkbox';
import { PageContainer } from '../../components/PageContainer';
import { TextField } from '../../components/TextField';
import { schema } from './schema';
import { AddFormInterface } from 'app/addTask/AddForm.types';

export default function AddTask() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddFormInterface>({
    resolver: yupResolver(schema),
  });

  const [addTask] = useAddTaskMutation();

  const onSubmit = async (data: AddFormInterface) => {
    console.log('Submitting:', data);
    try {
      await addTask({ name: data.name, info: data.info, isImportant: data.isImportant }).unwrap();
      console.log('Success:', data);
      reset();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <PageContainer>
      <h1>TODO LIST | ADD TASK</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField placeholder="Clean room" label="Task name" {...register('name')} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        <TextField placeholder="Clean my room" label="What to do (description)" {...register('info')} />
        {errors.info && <p style={{ color: 'red' }}>{errors.info.message}</p>}
        <Checkbox label="Important" {...register('isImportant')} />

        <button type="submit" className="btn btn-secondary d-block ml-auto">
          Add task
        </button>
      </form>
    </PageContainer>
  );
}
