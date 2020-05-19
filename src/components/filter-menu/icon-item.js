import React from 'react';
import {
  ListItem, 
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default function IconItem ({item}) {
  const classes = useStyles();

  return (
    // <ListItem button className={classes.root}>
    <ListItem button>
      <FontAwesomeIcon icon={item.icon} />
      {item.label}
    </ListItem>
  );
}