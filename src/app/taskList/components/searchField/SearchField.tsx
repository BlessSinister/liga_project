import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDispatch } from 'react-redux';
import SearchFormInterface from './searchForm.types';
import { schema } from './schema';

import { SearchInput } from 'components/SearchInput';
import { setSearchFilter } from 'app/store/reducers';

function SearchField({ children }: any) {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      value: '',
    },
  });

  const onSubmit = (data: SearchFormInterface) => {
    dispatch(setSearchFilter(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex' }}>
      <Controller
        name="value"
        control={control}
        render={({ field }) => (
          <SearchInput value={field.value} onChange={field.onChange} onReset={() => reset()}>
            {children}
          </SearchInput>
        )}
      />

      {errors.value && <p style={{ color: 'red' }}>{errors.value.message}</p>}
    </form>
  );
}

export default SearchField;
