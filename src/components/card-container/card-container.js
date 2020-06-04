import { DataView } from 'primereact/dataview';
import React from 'react';
import ProjectCard from './card';

const CardContainer = ({records, cardChange, selectedCard}) => {
  const MappedCard = data => (
    <ProjectCard
      key={data['Base ID']}
      data={data}
      setCard={cardChange}
      selectedCard={selectedCard}/>
  );

  return records.length ?
    <DataView value={records} layout='grid' itemTemplate={MappedCard} /> :
    <div style={{alignSelf: 'center', margin: '0 auto'}}>
      <h3>No records match that criteria</h3>
    </div>
  ;
}

export default CardContainer;