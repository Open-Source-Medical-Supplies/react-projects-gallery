import classNames from "classnames";
import React from 'react';
import TileCard from '../../shared/components/tile-card';
import { MAPPER } from '../../shared/utilities';

const ProjectCard = ({data, setCard, selectedCard}) =>{
  const {
    name, displayName, imageURL // medicalStatus -> caduceus icon
  } = MAPPER.ProjectToJSON(data);

  const selectCard = () => setCard({selectedCard: data, visible: true});
  
  const selectedName = selectedCard['Full Project Name'];

  const card = classNames('action-card', {
    "card-selected": !!selectedName && selectedName === name,
  });
  const sizing = classNames({
    'p-col-3': !selectedName,   // default
    'p-col-6': !!selectedName   // a card is selected
  })
  return (
    <div key={name} className={sizing}>
      <TileCard
        header={name}
        subHeader={displayName}
        imageURL={imageURL}
        className={card}
        action={selectCard} />
    </div>
  );
}
export default ProjectCard;