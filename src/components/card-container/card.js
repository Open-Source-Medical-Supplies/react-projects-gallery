import React from 'react';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import classNames from "classnames";
import { MapCardToJSON } from '../../service/mapCardToJSON';

const ProjectCard = ({data, setCard, selectedCard}) =>{
  const {
    name, displayName, reviewStatus, imageURL
  } = MapCardToJSON(data);

  const selectCard = () => {
    setCard({selectedCard: data, visible: true});
  }

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
      <Card header={headerImage} footer={footer} className={highlight}>
        <h2 className='clamp-1'> {name} </h2>
        <h3 className='clamp-1'> {displayName} </h3>
      </Card>
    </div>
  );
}
export default ProjectCard;