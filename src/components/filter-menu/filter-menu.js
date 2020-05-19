import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ExpansionList from './expansion-list';
import { List } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    maxWidth: '25%'
  }
}));

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
  const classes = useStyles();
  const [lists, setLists] = useState([])

  useEffect(() => {
    (async function() {
      console.log('add filter categories')
      setLists(mockList)
    })()
  }, [])

  return (
    <List component='nav' 
      aria-labelledby="nested-list"
      classes={classes.root}>
      { lists.map(list => <ExpansionList key={list.label} list={list} />) }
    </List>
  );
};

export default FilterMenu;