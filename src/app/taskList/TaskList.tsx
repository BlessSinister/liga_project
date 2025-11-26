import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useGetTasksQuery } from '../../api/tasksApi';
import SearchField from './components/searchField/SearchField';
import { AppTask } from './Task.types';
import { TaskListItem } from './components/TaskListItem/TaskListItem';
import styles from './TaskList.module.css';
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
      <div className={styles.filterWrapper}>
        <SearchField>
          <Filter />
        </SearchField>
      </div>
      <div className={styles.contentWrapper}>
        {filteredTodos.map((item: { id: number; name: string; info: string }, index: number) => (
          <div key={index}>
            <TaskListItem name={item.name} info={item.info} id={item.id} />
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
