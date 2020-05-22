import React from 'react';
import ProjectCard from './card';

const CardContainer = ({records, cardChange, selectedCard}) => {
  return (
    <div className='p-grid'>
      {
        records.reduce((acc, fields) => {
          if(fields['Full Project Name']) {
            acc.push(
              <ProjectCard
                key={fields['Base ID']}
                data={fields}
                setCard={cardChange}
                selectedCard={selectedCard}/>
            ); 
          }
          return acc;
        }, [])
      }
    </div>
  );
}

export default CardContainer;