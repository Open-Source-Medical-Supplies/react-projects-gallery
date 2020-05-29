import React, {useState, useEffect} from 'react';
import {InputText} from 'primereact/inputtext';
import { MapCardToJSON } from '../../service/mapCardToJSON';

export const SearchBar = ({setState, _records}) => {
  const [searchState, setSearchState] = useState('');
  const onInputChange = e => setSearchState(e.target.value);
  
  useEffect(() => {
    const filteredRecords = !searchState.length ? _records : _records.filter(record => {
      const { name } = MapCardToJSON(record);
      return name.toLowerCase().includes(searchState.toLowerCase())
    });
    setState({records: filteredRecords});
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