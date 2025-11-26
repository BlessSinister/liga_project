import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useGetTasksQuery } from '../../api/tasksApi';
import SearchField from './components/searchField/SearchField';
import { AppTask } from './Task.types';
import { PageContainer } from 'components/PageContainer';
import { getAllTodos } from 'app/store/reducers';
import { Filter } from 'components/Filter';
import { AppDispatch } from 'app/store/store';

function TaskList() {
  const { data } = useGetTasksQuery(undefined);
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector(({ todos }) => todos);
  const searchState = useSelector((state: { search: { value: string } }) => state.search.value);
  const activeFilter = useSelector((state: { filter: string }) => state.filter);
  let filteredTodos = state.filter((item: AppTask) => {
    if (activeFilter == 'all') {
      return item;
    } else if (activeFilter == 'done') {
      return item.isCompleted == true;
    } else if (activeFilter == 'important') {
      return item.isImportant == true;
    } else if (activeFilter == 'active') {
      return item.isCompleted == false;
    }
  });
  if (searchState.length > 0) {
    filteredTodos = filteredTodos.filter((item: { name: string }) => item.name == searchState);
  }
  useEffect(() => {
    if (data) {
      dispatch(getAllTodos(data));
    }
  }, [data]);
  return (
    <PageContainer>
      <h1>TODO LIST</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchField>
          <Filter />
        </SearchField>
      </div>
      <div className="div" style={{ height: '400px', minHeight: '400px', overflow: 'auto' }}>
        {filteredTodos.map((item: { id: number; name: string }, index: number) => (
          <div key={index}>
            <ul>
              <li>
                <Link to={`/edit/${item.id}`}>{item.name}</Link>
              </li>
              <li>{item.id}</li>
            </ul>
          </div>
        ))}
      </div>
      <Link className="btn btn-secondary d-block ml-auto" to="/add">
        Add task
      </Link>
    </PageContainer>
  );
}

export default TaskList;
