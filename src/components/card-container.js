import React, { useEffect, useState } from 'react';
import { shallowRows } from '../service/airtable';
import ProjectCard from './card';

const CardContainer = ({cardChange, selectedCard}) => {
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
    <div className='p-grid'>
      { records.map(({id, fields}) => <ProjectCard key={id} data={fields} setCard={cardChange} selected={selectedCard}/> ) }
    </div>
  );
}

export default CardContainer;