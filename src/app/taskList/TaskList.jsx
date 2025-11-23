import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PageContainer } from 'components/PageContainer';
import { SearchInput } from 'components/SearchInput';
import { getAllTodos, setFilter } from 'app/store/reducers';

function TaskList() {
  const state = useSelector(({ todos }) => todos);
  const activeFilter = useSelector((state) => state.filter);
  const filteredTodos = state.filter((item) => {
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
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  function handleChange(value) {
    return setSearchValue(value);
  }
  function onReset() {
    setSearchValue('');
  }
  const fn = async () => {
    let res = await axios.get('https://tasks-service-maks1394.amvera.io/tasks');
    dispatch(getAllTodos(res.data));
  };

  const styleButton = {
    backgroundColor: 'rgb(37, 202, 240)',
    borderColor: 'rgb(49, 202, 240)',
    borderWidth: '2px',
    borderStyle: 'solid',
    outline: 'rgb(49, 202, 240)',
  };
  useEffect(() => {
    fn();
  }, []);

  return (
    <PageContainer>
      <h1>TODO LIST</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SearchInput value={searchValue} onChange={handleChange} onReset={onReset} />

        <form className="search-form d-flex justify-content-between">
          <div className="btn-group" style={{ marginRight: '1.2rem' }}>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => dispatch(setFilter('all'))}
              style={activeFilter == 'all' ? styleButton : { backgroundColor: 'white' }}>
              All
            </button>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => dispatch(setFilter('active'))}
              style={activeFilter == 'active' ? styleButton : { backgroundColor: 'white' }}>
              Active
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => dispatch(setFilter('done'))}
              style={activeFilter == 'done' ? styleButton : { backgroundColor: 'white' }}>
              Done
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => dispatch(setFilter('important'))}
              style={activeFilter == 'important' ? styleButton : { backgroundColor: 'white' }}>
              Important
            </button>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Find
            </button>
          </div>
        </form>
      </div>
      {filteredTodos.map((item, index) => (
        <div key={index}>
          <ul>
            <li>{item.name}</li>
            <li>{item.id}</li>
          </ul>
        </div>
      ))}
      <a className="btn btn-secondary d-block ml-auto" href="/add">
        Add task
      </a>
    </PageContainer>
  );
}

export default TaskList;
