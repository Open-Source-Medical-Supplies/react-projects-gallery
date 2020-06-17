import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const TileCard = (
  {
    header, imageURL, subHeader, action, actionOnCard, className = '', icon = true, buttonIcon='eye'
  } : {
    header: string;
    imageURL: string;
    subHeader?: string;
    action?: Function;
    actionOnCard?: boolean;
    className?: string;
    icon?: boolean;
    buttonIcon?: string;
  }
) => {
  const headerImage = (
    typeof imageURL !== 'string' ?
      <div className='center-flex card-header__no-image'>No image</div> :
      <img className='centered-image card-header__image' alt={header} src={imageURL}/>
  )

  const footer = (
    action ?
      <span style={{display: 'flex', justifyContent: 'flex-end'}}>
        {
          icon ?
          <Button onClick={(e) => action(e)} label='View' icon={'pi pi-' + buttonIcon} iconPos='right' className="p-button-raised p-button-rounded" /> :
          <Button onClick={(e) => action(e)} label='View' className="p-button-raised p-button-rounded" />
        }
      </span> : null
  );

  const ActionCard = () => action ? 
    <button className={className + ' tile-card button-no-style'} onClick={(e) => action(e)}>
      <Card header={headerImage}>
        <div className='tile-card__header clamp-1'> {header} </div>
        { subHeader ? <div className='tile-card__sub-header clamp-1'> {subHeader} </div> : null }
      </Card>
    </button> : null;

  const DefaultCard = () => (
    <Card header={headerImage} footer={footer} className={className + ' tile-card'}>
      <div className='tile-card__header clamp-1'> {header} </div>
      { subHeader ? <h3 className='tile-card__sub-header clamp-1'> {subHeader} </h3> : null }
    </Card> 
  );

  return actionOnCard ? <ActionCard />: <DefaultCard />;
}

export default TileCard;