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

  if (typeof data.HeaderImageURL !== 'string') {
    console.warn('no image url: ' + data['Base ID'])
  }

  const headerImage = (
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
  return (
    <div key={name} className='p-col-4'>
      <Card header={headerImage} footer={footer} className={highlight}>
        <h2 className='clamp-1'> {name} </h2>
        <h3 className='clamp-1'> {displayName} </h3>
      </Card>
    </div>
  );
}
export default ProjectCard;