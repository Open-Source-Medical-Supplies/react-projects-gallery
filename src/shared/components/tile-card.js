import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

/**
 * @param {string} header 
 * @param {string} imageURL 
 * @Optional
 * @param {string}    subHeader     - undefined
 * @param {function}  action        - undefined - button's action, no button shows if omited
 * @param {boolean}   actionOnCard  - false     - if the action should be a button or the card itself. Cannot be used w/ icon
 * @param {string}    className     - ' '
 * @param {boolean}   icon          - true
 * @param {string}    buttonIcon    - 'eye'
 */
const TileCard = ({header, imageURL, subHeader, action, actionOnCard, className = '', icon = true, buttonIcon='eye'}) => {
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
          <Button onClick={() => action()} label='View' icon={'pi pi-' + buttonIcon} iconPos='right' className="p-button-raised p-button-rounded" /> :
          <Button onClick={() => action()} label='View' className="p-button-raised p-button-rounded" />
        }
      </span> : null
  );

  const ActionCard = () => (
    <button className={className + ' tile-card button-no-style'} onClick={() => action()}>
      <Card header={headerImage}>
        <div className='tile-card__header clamp-1'> {header} </div>
        { subHeader ? <div className='tile-card__sub-header clamp-1'> {subHeader} </div> : null }
      </Card>
    </button>
  );

  const DefaultCard = () => (
    <Card header={headerImage} footer={footer} className={className + ' tile-card'}>
      <div className='tile-card__header clamp-1'> {header} </div>
      { subHeader ? <h3 className='tile-card__sub-header clamp-1'> {subHeader} </h3> : null }
    </Card> 
  );

  return actionOnCard ? <ActionCard />: <DefaultCard />;
}

export default TileCard;