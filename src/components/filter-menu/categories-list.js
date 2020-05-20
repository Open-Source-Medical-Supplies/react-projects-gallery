import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconItem from './icon-item';

const CategoriesList = ({ list }) => {
  const [state, setState] = useState({
    open: true,
    list,
  });
  const handleClick = () => {
    setState({ ...state, open: !state.open });
  };

  return (
    <div>
      {/* <ListItem button onClick={handleClick}>
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
            <Grid container spacing={1}>
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
      </Collapse> */}
    </div>
  );
};
export default CategoriesList;
