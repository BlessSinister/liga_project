import React, { ChangeEventHandler, MouseEvent } from 'react';
import './SearchInput.css';
import { useDispatch } from 'react-redux';
import { SearchInputProps } from './SearchInput.types';
import { setSearchFilter } from 'app/store/reducers';

export function SearchInput({ onChange, value, onReset, children }: SearchInputProps) {
  const dispatch = useDispatch();

  const onSearchInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => onChange(evt.target.value);

  const onResetBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (onReset) onReset();
    dispatch(setSearchFilter({ value: '' }));
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className="search-panel">
        <input
          className="form-control search-input"
          placeholder="search"
          onChange={onSearchInputChange}
          value={value}
        />
        <button className="close" onClick={onResetBtnClick}>
          <i className="fa fa-close"></i>
        </button>
      </div>

      {children}

      <div>
        <button type="submit" className="btn btn-primary">
          Find
        </button>
      </div>
    </div>
  );
}
