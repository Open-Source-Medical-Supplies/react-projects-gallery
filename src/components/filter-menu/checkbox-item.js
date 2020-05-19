import React from 'react';
import { ListItem } from '@material-ui/core';

export default function CheckboxItem ({item, classes}) {
  return (
    // <ListItem button className={classes.nested}>
    <ListItem button>
      checkbox<br />
      {item.label}
    </ListItem>
  );
}