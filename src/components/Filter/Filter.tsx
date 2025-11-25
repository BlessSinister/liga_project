import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'app/store/reducers';

export function Filter() {
  const dispatch = useDispatch();
  // const activeFilter = useSelector((state) => state.filter);

  const styleButton = {
    backgroundColor: 'rgb(37, 202, 240)',
    borderColor: 'rgb(49, 202, 240)',
    borderWidth: '2px',
    borderStyle: 'solid',
    outline: 'rgb(49, 202, 240)',
  };
  return (
    <div className="btn-group" style={{ marginRight: '1.2rem' }}>
      <button type="button" className="btn btn-outline-secondary" onClick={() => dispatch(setFilter('all'))}>
        All
      </button>
      <button type="button" className="btn btn-info" onClick={() => dispatch(setFilter('active'))}>
        Active
      </button>
      <button type="button" className="btn btn-outline-secondary" onClick={() => dispatch(setFilter('done'))}>
        Done
      </button>
      <button type="button" className="btn btn-outline-secondary" onClick={() => dispatch(setFilter('important'))}>
        Important
      </button>
    </div>
  );
}
