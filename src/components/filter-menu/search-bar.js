import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';

export const SearchBar = ({setFilterState}) => {
  const [searchState, setSearchState] = useState('');
  const onInputChange = e => setSearchState(e.target.value);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setFilterState({searchBar: searchState || ''}), [searchState]);

  return (
    <div className='sticky-top-0' style={{zIndex: 10}}>
      <span className='p-float-label'>
        <label htmlFor='searchBar'>{searchState.length ? '' : 'Search'}</label>
        <InputText id='searchBar'
          style={{width: '100%'}}
          onChange={onInputChange}
          value={searchState}></InputText>
      </span>
    </div>
  )
}