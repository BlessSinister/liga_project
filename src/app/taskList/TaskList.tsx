import React, { useState } from 'react';
import { PageContainer } from 'components/PageContainer';

import { SearchInput } from 'components/SearchInput';

function TaskList() {
  const [searchValue, setSearchValue] = useState('Okay');
  function handleChange(value: string) {
    return setSearchValue(value);
  }
  function onReset(): void {
    setSearchValue('');
  }

  return (
    <PageContainer>
      <h1>TODO LIST</h1>
      <SearchInput value={searchValue} onChange={handleChange} onReset={onReset} />
    </PageContainer>
  );
}

export default TaskList;
