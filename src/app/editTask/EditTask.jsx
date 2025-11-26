import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import EditForm from './components/EditForm';
import { PageContainer } from 'components/PageContainer';

export default function editTask() {
  const { id } = useParams();

  const state = useSelector(({ todos }) => todos);

  //Надо будет добавить сохранение в локал сторедж
  const filtered = state.filter((item) => item.id == +id);

  if (!filtered.length) {
    return null;
  }
  return (
    <PageContainer>
      <Link to={'/'} className="btn btn-info">
        Back
      </Link>

      <h1>TODO LIST | ADD TASK</h1>
      <h3>Task Name: {filtered[0].name}</h3>
      <p>Task Info: {filtered[0].info}</p>
      <EditForm id={id} />
    </PageContainer>
  );
}
