import React from 'react';
import { CheckboxProps } from './Checkbox.types';

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, onChange, disabled, containerClassName = '', ...rest }, ref) => {
    return (
      <div className={`form-check mb-3 ${containerClassName}`}>
        <input
          className="form-check-input"
          type="checkbox"
          id={label}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          ref={ref}
          {...rest}
        />
        <label className="form-check-label" htmlFor={label}>
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
