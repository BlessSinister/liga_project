import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUpdateTaskMutation } from '../../../api/tasksApi';
import { EditSchema } from './schema';
import { EditFormInterface } from './EditForm.types';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';
import { PageContainer } from 'components/PageContainer';

export default function EditForm({ task, id }) {
  const [updateTask] = useUpdateTaskMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  {
    yupResolver(EditSchema);
  }

  const onSubmit = async (data) => {
    console.log({ id, body: data });
    try {
      await updateTask({ id, body: data }).unwrap();
      console.log('Updated!', data);
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
          render={({ field }) => <TextField label="Name" placeholder="Fix bug #42" {...field} />}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

        <Controller
          name="info"
          control={control}
          render={({ field }) => <TextField label="Info" placeholder="Steps to reproduce..." {...field} />}
        />
        {errors.info && <p style={{ color: 'red' }}>{errors.info.message}</p>}

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
