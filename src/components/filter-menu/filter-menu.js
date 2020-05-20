import React, { useEffect, useState } from 'react';
import ExpansionList from './expansion-list';

const mockList = [
  {
    label: 'Categories',
    icon: 'tags',
    options: [
      {
        label: 'Bowling Balls',
        icon: 'bowling-ball'
      },
      {
        label: 'Cold War Surplus',
        icon: 'fighter-jet'
      },
      {
        label: 'Lemons',
        icon: 'lemon'
      },
      {
        label: 'Quidditch Supplies',
        icon: 'quidditch'
      },
      {
        label: 'A firm handshake',
        icon: 'handshake'
      },
    ]
  }
]

const FilterMenu = (props) => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    (async function() {
      console.log('add filter categories')
      setLists(mockList)
    })()
  }, [])

  return (
    <div></div>
    // <div className={classes.root}>
    //   <List component='nav' aria-labelledby="nested-list">
    //     { lists.map(list => <ExpansionList key={list.label} list={list} />) }
    //   </List>
    // </div>
  );
};

export default FilterMenu;