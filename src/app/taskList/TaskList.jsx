import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PageContainer } from 'components/PageContainer';
import { SearchInput } from 'components/SearchInput';
import { getAllTodos } from 'app/store/reducers';

function TaskList() {
  const state = useSelector(({ todos }) => todos);

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
            <button type="button" className="btn btn-outline-secondary">
              All
            </button>
            <button type="button" className="btn btn-info">
              Active
            </button>
            <button type="button" className="btn btn-outline-secondary">
              Done
            </button>
            <button type="button" className="btn btn-outline-secondary">
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
      {state.map((item, index) => (
        <div key={index}>
          <ul>
            <li>{item.name}</li>
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
