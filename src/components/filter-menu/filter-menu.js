import React, { useEffect, useState } from 'react';
import CategoriesList from './categories-list';
import classNames from "classnames";
import { Tree } from 'primereact/tree';

const mockList = [
  {
    key: 'Categories',    // marked optional in types, but required for checkboxes
    label: 'Categories',
    icon: 'tags',         // must be pi-icons
    children: [
      {
        key: 'Bowling Balls',
        label: 'Bowling Balls',
        icon: 'fas fa-bowling-ball'
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
  }
]

const TreeStateDefault = {
  nodes: [],
  selection: null
};

const FilterMenu = (props) => {
  const [treeState, setState] = useState(TreeStateDefault)
  
  useEffect((treeState) => {
    (async function fetch () {
      console.log('add filter categories')
      setState({...treeState, nodes: mockList})
    })()
  }, []);

  const setSelection = event => setState({...treeState, selection: event.value})

  const classes = {
    root: classNames('foo')
  }
  console.log(treeState.selection)
  return (
    <div className={classes.root}>
      <CategoriesList />
      <Tree
        value={treeState.nodes}
        selectionMode='checkbox'
        selectionKeys={treeState.selection}
        onSelectionChange={setSelection}>
      </Tree>
    </div>
  );
};

export default FilterMenu;