import React, { useEffect, useState } from 'react';
import { getFilterMenu } from '../../service/airtable';
import CategoriesList from './categories-list';
import { filterBy, parseRecords } from './filter-menu.utilities';
import { SearchBar } from './search-bar';
import AttributesList from './attributes-list';

const FilterStateDefault = {
  nodes: [],
  nodeFilters: {},
  categories: {
    parent: [],
    children: []
  },
  categoriesFilters: {},
  filters: {}
};

const FilterMenu = ({setState, _records}) => {
  const [filterState, baseSetFilterState] = useState(FilterStateDefault);
  const setFilterState = (props) => baseSetFilterState({...filterState, ...props});
  const setSelection = event => setFilterState({nodeFilters: event.value});

  // load menu
  useEffect(() => {
    (async function fetch () {
      const menu = await getFilterMenu();
      menu.eachPage(
        (records, fetchNextPage) => {
          const simpleFields = records.map(({fields}) => fields);
          const {categories, nodes} = parseRecords(simpleFields);
          setFilterState({categories, nodes});
        },
        (err) => {
          if (err) { console.error(err); return; }
        }
      );
    })()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // filter-changes
  useEffect(() => {
    const filteredRecords = filterBy(filterState, _records);
    setState({records: filteredRecords});
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterState.categoriesFilters,
    filterState.nodeFilters
  ]);

  return (
    <div className='sticky-top-0'>
      <SearchBar setState={setState} _records={_records} />
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