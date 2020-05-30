import classNames from "classnames";
import { Button } from 'primereact/button';
import React from 'react';
import { MapCardToJSON } from '../../service/mapCardToJSON';
import TileCard from '../../shared/components/tile-card';

const ProjectCard = ({data, setCard, selectedCard}) =>{
  const {
    name, displayName, reviewStatus, imageURL
  } = MapCardToJSON(data);

  const selectCard = () => setCard({selectedCard: data, visible: true});

  const headerImage = (
    typeof data.HeaderImageURL !== 'string' ?
      <div className='center-flex' style={{height: '150px'}}>No image available</div> :
      <img className='centered-image' alt={name} src={imageURL} style={{ height: '150px' }}/>
  )
  const footer = (
    <span style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button
        onClick={selectCard}
        label='View'
        icon='pi
        pi-eye'
        iconPos='right'
        className="p-button-raised p-button-rounded" />
    </span>
  );
  
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