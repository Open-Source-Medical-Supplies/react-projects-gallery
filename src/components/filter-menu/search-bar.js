import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';

export const SearchBar = ({searchBarText, setFilterState}) => {
  const [searchState, setSearchState] = useState('');
  const onInputChange = e => setSearchState(e.target.value);
  
  useEffect(() => {
    setFilterState({
      searchBar: searchState || '',
      previous: {
        searchBar: searchBarText || ''
      }
    });
  }, [searchState]); // eslint-disable-line react-hooks/exhaustive-deps

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