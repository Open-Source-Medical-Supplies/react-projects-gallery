import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Collapse,
  List,
  makeStyles,
  createStyles,
  Grid,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckboxItem from './checkbox-item';
import IconItem from './icon-item';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));

const ExpansionList = ({ list }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    open: true,
    list,
  });
  const handleClick = () => {
    setState({ ...state, open: !state.open });
  };
  const makeItems = () => {
    state.list.options.map((item) => {
      return state.list.label === 'Categories' ?
        <IconItem key={item.label} item={item}/> :
        <CheckboxItem key={item.label} item={item}/>
    })
  }

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={state.list.label} />
        {state.open ? (
          <FontAwesomeIcon icon="chevron-down" />
        ) : (
          <FontAwesomeIcon icon="chevron-up" />
        )}
      </ListItem>
      <Collapse in={state.open} timeout="auto" unmountOnExit>
        { 
          state.list.label === 'Categories' ?
            <Grid>
              {
                state.list.options
                .map((item) => <IconItem key={item.label} item={item}/>)
              }
            </Grid>
            :
            <List component="div" disablePadding>
              {
                state.list.options
                .map((item) => <CheckboxItem key={item.label} item={item}/> )
              }
            </List>
        }
      </Collapse>
    </div>
  );
};
export default ExpansionList;
