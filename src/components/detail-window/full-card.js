import { Button } from 'primereact/button';
import React from 'react';
import { MapCardToJSON } from '../../service/mapCardToJSON';
import { OpenExternalSafely } from '../../shared/utilities';

const FullCard = ({card}) => {
  const {
    name, displayName, reviewStatus, imageURL, description, externalLink, attributionOrg, creator
  } = MapCardToJSON(card);
  
  const headerImage = (
    <img className='centered-image' alt={name} src={imageURL} style={{ height: '250px' }}/>
  )

  const desc = (
    <section>
      <p>
        {description}
      </p>
    </section>
  );

  const source = (
    <section>
      <h3>Source</h3>
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a href={externalLink} target='_blank' rel={OpenExternalSafely}>{externalLink}</a>

    </section>
  );

  const attribution = (
    <section>
      <h3>Attribution Organization</h3>
      <p>
        {attributionOrg}
      </p>
    </section>
  )

  const creatorAttr = !!creator ? (
    <section>
      <h3>Creator</h3>
      <p>
        {creator}
      </p>
    </section>
  ) : null;

  console.log('todo: full-card icon ternary logic')
  // icon='pi pi-download'

  const openExternal = () => window.open(externalLink, OpenExternalSafely);
  const footer = (
    <span className="full-card__footer">
      <Button
        onClick={openExternal}
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