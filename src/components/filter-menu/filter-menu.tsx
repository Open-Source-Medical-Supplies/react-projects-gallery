import React, { useEffect, useState } from 'react';
import { parseCategories, parseFilterMenu } from '../../service/filter-menu.service';
import AttributesList from './attributes-list';
import CategoriesList from './categories-list';
import { filterBy } from './filter-menu.utilities';
import { SearchBar } from './search-bar';
import { FilterState } from './filter-menu.interface';

const FilterStateDefault: FilterState = {
  nodes: [], // attributes
  flatNodes: {},
  nodeFilters: {},
  categories: [],
  categoriesFilters: {},
  filters: {},
  searchBar: '',
  previousFilters: {
    nodeFilters: {},
    categoriesFilters: {},
    searchBar: ''
  }
};

const FilterMenu = ({state, setState}: {state: any, setState: Function}) => {
  const {_records, records } = state;
  const [filterState, baseSetFilterState] = useState(FilterStateDefault);
  const setFilterState = (props: Partial<FilterState>) => {
    const update = {
      ...props,
      previousFilters: {
        ...filterState.previousFilters,
        ...props.previousFilters
      }
    };
    baseSetFilterState({...filterState, ...update});
  };
  const setSelection = (event: any) => {
    setFilterState({
      nodeFilters: event.value,
      previousFilters: {
        nodeFilters: filterState.nodeFilters
      }
    });
  };
  
  // load menu
  useEffect(() => {
    (async function fetch () {
      Promise.all([
        parseFilterMenu(),
        parseCategories()
      ]).then(
        (res: any) => {
          setFilterState({ ...res[0], ...res[1] })
        }
      );
    })()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // filter-changes
  useEffect(() => {
    const filteredRecords = filterBy(filterState, _records, records);
    setState({records: filteredRecords});
  }, [filterState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='sticky-top-0'>
      <SearchBar
        searchBarText={filterState.searchBar}
        setFilterState={setFilterState}/>
      <div className='divider-1'></div>
      <CategoriesList
        categories={filterState.categories}
        categoriesFilters={filterState.categoriesFilters}
        setFilterState={setFilterState}/>
      <div className='divider-1'></div>
      <AttributesList
        nodes={filterState.nodes}
        nodeFilters={filterState.nodeFilters}
        setSelection={setSelection}/>
    </div>
  );
};

export default FilterMenu;