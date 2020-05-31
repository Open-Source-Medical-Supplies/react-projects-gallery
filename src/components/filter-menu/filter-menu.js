import React, { useEffect, useState } from 'react';
import { getFilterMenu } from '../../service/airtable';
import { empty } from '../../shared/utilities';
import AttributesList from './attributes-list';
import CategoriesList from './categories-list';
import { filterBy, parseRecords } from './filter-menu.utilities';
import { SearchBar } from './search-bar';

const FilterStateDefault = {
  nodes: [],
  nodeFilters: {},
  categories: {},
  categoriesFilters: {},
  filters: {},
  searchBar: ''
};

const FilterMenu = ({state, setState}) => {
  const {_records, records, categories} = state;
  const [filterState, baseSetFilterState] = useState(FilterStateDefault);
  const setFilterState = (props) => baseSetFilterState({...filterState, ...props});
  const setSelection = event => setFilterState({nodeFilters: event.value});
  
  useEffect(() => {
    // maybe move the loading of categories down here from app.js
    setFilterState({categories});
  }, [categories]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // load menu
  useEffect(() => {
    (async function fetch () {
      const menu = await getFilterMenu();
      menu.eachPage(
        (records, fetchNextPage) => {
          const simpleFields = records.map(({fields}) => fields);
          const {nodes} = parseRecords(simpleFields);
          setFilterState({nodes});
        },
        (err) => {
          if (err) { console.error(err); return; }
        }
      );
    })()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // filter-changes
  useEffect(() => {
    if (empty(filterState)) { return; }
    const filteredRecords = filterBy(filterState, _records);
    setState({records: filteredRecords});
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterState.categoriesFilters,
    filterState.nodeFilters,
    filterState.searchBar
  ]);

  return (
    <div className='sticky-top-0'>
      <SearchBar
        searchState={filterState.searchBar}
        setFilterState={setFilterState}/>
      <div className='divider-1'></div>
      <CategoriesList
        categories={filterState.categories}
        categoriesFilters={filterState.categoriesFilters}
        setFilterState={setFilterState}/>
      <div className='divider-1'></div>
      <AttributesList
        nodes={filterState.nodes}
        selectionKeys={filterState.nodeFilters}
        setSelection={setSelection}/>
    </div>
  );
};

export default FilterMenu;