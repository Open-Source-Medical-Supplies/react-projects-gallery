import React from 'react';
import ProjectCard from './card';
import { empty } from '../../shared/utilities';
import { DataView } from 'primereact/dataview';

const CardContainer = ({records, cardChange, selectedCard}) => {
  if(!records || empty(records)) { return null; }

  const MappedCard = data => (
    <ProjectCard
      key={data['Base ID']}
      data={data}
      setCard={cardChange}
      selectedCard={selectedCard}/>
  );

  return (
    <DataView value={records} layout='grid' itemTemplate={MappedCard} />
  );
}

export default CardContainer;