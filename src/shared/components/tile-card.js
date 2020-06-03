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
    <button className={className + ' button-no-style'} onClick={() => action()}>
      <Card header={headerImage}>
        <h4 className='clamp-1'> {header} </h4>
        { subHeader ? <h5 className='clamp-1'> {subHeader} </h5> : null }
      </Card>
    </button>
  );

  const DefaultCard = () => (
    <Card header={headerImage} footer={footer} className={className}>
      <h2 className='clamp-1'> {header} </h2>
      { subHeader ? <h3 className='clamp-1'> {subHeader} </h3> : null }
    </Card> 
  );

  return actionOnCard ? <ActionCard />: <DefaultCard />;
}

export default TileCard;