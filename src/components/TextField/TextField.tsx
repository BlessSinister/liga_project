import React from 'react';
import { TextFieldProps } from './TextField.types';
import './TextField.css';

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, placeholder, containerClassName = '', inputType = 'text', value, onChange, errorText, ...rest }, ref) => {
    return (
      <div className={`mb-3 ${containerClassName}`}>
        <label htmlFor={label} className="form-label">
          {label}
        </label>
        <input
          type={inputType}
          className="form-control"
          id={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
          {...rest}
        />
        {errorText && <div className="invalid">{errorText}</div>}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
