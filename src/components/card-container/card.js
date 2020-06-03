import classNames from "classnames";
import React from 'react';
import TileCard from '../../shared/components/tile-card';
import { MAPPER } from '../../shared/utilities';

const ProjectCard = ({data, setCard, selectedCard}) =>{
  const {
    name, displayName, reviewStatus, imageURL
  } = MAPPER.ProjectToJSON(data);

  const selectCard = () => setCard({selectedCard: data, visible: true});
  
  const selectedName = selectedCard['Full Project Name'];

  const highlight = classNames({
    "card-selected": !!selectedName && selectedName === name
  });
  const sizing = classNames({
    'p-col-4': !selectedName,
    'p-col-6': !!selectedName
  })
  return (
    <div key={name} className={sizing}>
      <TileCard
        header={name}
        subHeader={displayName}
        imageURL={imageURL}
        className={highlight}
        action={selectCard} />
    </div>
  );
}
export default ProjectCard;