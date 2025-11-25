import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetTasksQuery } from '../../api/tasksApi';
import SearchField from './components/searchField/SearchField';
import { PageContainer } from 'components/PageContainer';
import { getAllTodos } from 'app/store/reducers';
import { Filter } from 'components/Filter';

function TaskList() {
  const { data } = useGetTasksQuery();
  const dispatch = useDispatch();
  const state = useSelector(({ todos }) => todos);
  const searchState = useSelector((state) => state.search.value);
  console.log(searchState.length);
  const activeFilter = useSelector((state) => state.filter);
  let filteredTodos = state.filter((item) => {
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
    filteredTodos = filteredTodos.filter((item) => item.name == searchState);
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
      {filteredTodos.map((item, index) => (
        <div key={index}>
          <ul>
            <li>
              <Link to={`/edit/${item.id}`}>{item.name}</Link>
            </li>
            <li>{item.id}</li>
          </ul>
        </div>
      ))}
      <Link className="btn btn-secondary d-block ml-auto" to="/add">
        Add task
      </Link>
    </PageContainer>
  );
}

export default TaskList;
