import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'app/store/reducers';

export function Filter() {
  const dispatch = useDispatch();

  const activeFilter = useSelector((state: { filter: string }) => state.filter);

  const activeStyle = 'btn btn-info';
  const secondaryStyle = 'btn btn-outline-secondary';
  return (
    <div className="btn-group" style={{ marginRight: '1.2rem' }}>
      <button
        type="button"
        className={activeFilter == 'all' ? activeStyle : secondaryStyle}
        onClick={() => dispatch(setFilter('all'))}>
        All
      </button>
      <button
        type="button"
        className={activeFilter == 'active' ? activeStyle : secondaryStyle}
        onClick={() => dispatch(setFilter('active'))}>
        Active
      </button>
      <button
        type="button"
        className={activeFilter == 'done' ? activeStyle : secondaryStyle}
        onClick={() => dispatch(setFilter('done'))}>
        Done
      </button>
      <button
        type="button"
        className={activeFilter == 'important' ? activeStyle : secondaryStyle}
        onClick={() => dispatch(setFilter('important'))}>
        Important
      </button>
    </div>
  );
}
