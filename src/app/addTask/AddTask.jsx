import React, { useState } from 'react';
import { useAddTaskMutation } from '../../api/tasksApi';
import { PageContainer } from 'components/PageContainer';
import { TextField } from 'components/TextField';
import { Checkbox } from 'components/Checkbox';

export default function AddTask() {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskInfo, setNewTaskInfo] = useState('');
  const [addTask, { isError }] = useAddTaskMutation();

  const handleAddNewTask = async () => {
    if (newTaskName || newTaskInfo) {
      await addTask({ name: newTaskName, info: newTaskInfo }).unwrap();
      setNewTaskName('');
      setNewTaskInfo('');
    }
  };

  return (
    <PageContainer>
      <h1>TODO LIST | ADD TASK</h1>

      <TextField
        placeholder={'Clean room'}
        label={'Task name'}
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
      />

      <TextField
        placeholder={'Clean my room'}
        label={'What to do(description)'}
        value={newTaskInfo}
        onChange={(e) => setNewTaskInfo(e.target.value)}
      />
      <Checkbox label={'Important'} />
      <a className="btn btn-secondary d-block ml-auto" href="/add" onClick={handleAddNewTask}>
        Add task
      </a>
    </PageContainer>
  );
}
