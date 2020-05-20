import React from 'react';
import ProjectCard from './card';

const CardContainer = ({records, cardChange, selectedCard}) => {
  return (
    <div className='p-grid'>
      {
        records.map(({id, fields}) => <ProjectCard
          key={id}
          data={fields}
          setCard={cardChange}
          selectedCard={selectedCard}
          /> )
      }
    </div>
  );
}

export default CardContainer;