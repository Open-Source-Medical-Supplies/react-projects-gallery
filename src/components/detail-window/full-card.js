import { Button } from 'primereact/button';
import React from 'react';
import { MapCardToJSON } from '../../service/mapCardToJSON';
import { OpenExternalSafely, openExternal } from '../../shared/utilities';

const FullCard = ({selectedCard}) => {
  const {
    name, displayName, reviewStatus, imageURL, description, externalLink, attributionOrg, creator
  } = MapCardToJSON(selectedCard);
  
  const headerImage = (
    <img className='centered-image' alt={name} src={imageURL} style={{ height: '250px' }}/>
  )

  const desc = (
    <section alt='description'>
      <p>
        {description}
      </p>
    </section>
  );

  const externalLinks = externalLink?.split(';') || [];
  const source = (
    <section alt='Sources' >
      <h3>Source</h3>
      {
        externalLinks.map(link => ( 
          // eslint-disable-next-line react/jsx-no-target-blank
          <a key={link.slice(0,-10)} href={link} target='_blank' rel={OpenExternalSafely}>
            <span className='clamp-1'>{link}</span>
          </a>
        ))
      }
    </section>
  );

  const attribution = (
    <section alt='Attribution Organization'>
      <h3>Attribution Organization</h3>
      <p>
        {attributionOrg}
      </p>
    </section>
  )

  const creatorAttr = !!creator ? (
    <section alt='Creator'>
      <h3>Creator</h3>
      <p>
        {creator}
      </p>
    </section>
  ) : null;

  console.log('todo: full-card icon + link/download ternary logic')
  // icon='pi pi-download'

  const footer = (
    <span alt='footer' className="full-card__footer">
      <Button
        onClick={openExternal(externalLinks[0])}
        tooltip='Link will open in a new tab'
        label='Make it!'
        icon='pi pi-external-link'
        iconPos='right'
        className="p-button-raised p-button-rounded" />
    </span>
  );

  return (
    <div className="full-card">
      <div className="full-card__content">
        {headerImage}
        <h1>{name}</h1>
        <h3>{displayName}</h3>
        {desc}
        {source}
        {attribution}
        {creatorAttr}
      </div>
      {footer}
    </div>
  );
}
export default FullCard;