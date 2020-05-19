import { createStyles, GridList, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { shallowRows } from '../service/airtable';
import ProjectCard from './card';

const setStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '65%',
      height: '100vh',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
      color: 'white',
    },
  })
);

const CardContainer = () => {
  const classes = setStyles();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async function fetch() {
      const sr = await shallowRows();
      sr.eachPage(
        (records, fetchNextPage) => {
          setRecords(records);  
        },
        (err) => {
          if (err) { console.error(err); return; }
        }
      );
    })();
  }, []);
    
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        { records.map(({id, fields}) => <ProjectCard key={id} data={fields}/> ) }
      </GridList>
    </div>
  );
}

export default CardContainer;