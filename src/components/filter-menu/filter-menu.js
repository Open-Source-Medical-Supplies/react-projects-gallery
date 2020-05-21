import React, { useEffect, useState } from 'react';
import CategoriesList from './categories-list';
import classNames from "classnames";
import { Tree } from 'primereact/tree';
import { getFilterMenu } from '../../service/airtable';
import { parseRecords } from './filter-menu.utilities';

const mockCategories = [
  {
    key: 'Bowling Balls',
    label: 'Bowling Balls',
    icon: 'bowling-ball'
  },
  {
    key: 'Cold War Surplus',
    label: 'Cold War Surplus',
    icon: 'fighter-jet'
  },
  {
    key: 'Lemons',
    label: 'Lemons',
    icon: 'lemon'
  },
  {
    key: 'Quidditch Supplies',
    label: 'Quidditch Supplies',
    icon: 'quidditch'
  },
  {
    key: 'A firm handshake',
    label: 'A firm handshake',
    icon: 'handshake'
  }
]
const mockAttributes = [
  {
    key: 'Audience',    // marked optional in types, but required for checkboxes else returns 'undefined'
    label: 'Audience',
    icon: 'pi pi-users',         // must be 'pi pi-icon'
    leaf: true,
    children: [
      {
        key: 'community',
        label: 'Community',
      },
      {
        key: 'essentialServiceWorkers',
        label: 'Essential / Service Workers',
      },
      {
        key: 'healthcare',
        label: 'Healthcare',
      },
      {
        key: 'erICUstaff',
        label: 'ER / ICU Staff',
      },
      {
        key: 'crisis',
        label: 'Crisis',
      }
    ]
  }
]

const TreeStateDefault = {
  nodes: [],
  selection: null,
  categories: []
};

const FilterMenu = ({setState, records, _records}) => {
  const [state, baseSetTree] = useState(TreeStateDefault);
  const setTree = (props) => baseSetTree({...state, ...props});
  
  useEffect(() => {
    (async function fetch () {
      const menu = await getFilterMenu();
      menu.eachPage(
        (records, fetchNextPage) => {
          const {categories, nodes} = parseRecords(records);
          setTree({categories, nodes});
        },
        (err) => {
          if (err) { console.error(err); return; }
        }
      );
    })()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // disabling it b/c this should only run once and not based on changes.

  const setSelection = event => setTree({selection: event.value});

  const classes = {
    root: classNames('foo')
  };

  return (
    <div className={classes.root}>
      <CategoriesList categories={state.categories} />
      <div className='p-panel'>
        <div className='p-panel-titlebar'>
          <span className="p-panel-title">Attributes</span>
        </div>
      </div>
      <Tree
        value={state.nodes}
        selectionMode='checkbox'
        selectionKeys={state.selection}
        onSelectionChange={setSelection}
        filter={true}
        filterPlaceholder='Filter'
        ></Tree>
    </div>
  );
};

export default FilterMenu;