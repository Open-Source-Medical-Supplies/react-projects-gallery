import React from 'react';
import ProjectCard from './card';
import { empty } from '../../shared/utilities';

const CardContainer = ({records, cardChange, selectedCard}) => {
  if(!records || empty(records)) { return null; }
  return (
    <div className='p-grid'>
      {
        records.reduce((acc, fields) => {
            acc.push(
              <ProjectCard
                key={fields['Base ID']}
                data={fields}
                setCard={cardChange}
                selectedCard={selectedCard}/>
            ); 
          return acc;
        }, [])
      }
    </div>
  );
}

export default CardContainer;