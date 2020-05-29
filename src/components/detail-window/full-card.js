import { Button } from 'primereact/button';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MapCardToJSON } from '../../service/mapCardToJSON';
import { OpenExternalSafely, openExternal } from '../../shared/utilities';

const FullCard = ({selectedCard}) => {
  const {
    name, displayName, reviewedBy, reviewStatus, imageURL, description, externalLink, attributionOrg, creator, osmsNotes
  } = MapCardToJSON(selectedCard);

  const markdownSection = (sectionName, md) => (
    <div key={sectionName}>
      <h3>{sectionName}</h3>
      <ReactMarkdown source={md} />
    </div>
  );
  
  const headerImage = (
    typeof imageURL !== 'string' ?
      <div className='center-flex' style={{height: '150px'}}>No image available</div> :
      <img className='centered-image' alt={name} src={imageURL} style={{ height: '250px' }}/>
  )

  const desc = (
    <section alt='description'>
      <ReactMarkdown source={description} />
      {
        osmsNotes ? markdownSection('Notes', osmsNotes) : null
      }
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
  );

  const creatorAttr = !!creator ? (
    <section alt='Creator'>
      <h3>Creator</h3>
      <p>
        {creator}
      </p>
    </section>
  ) : null;

  const reviewed = reviewedBy || reviewStatus ? (
    <section alt='Reviewed by'>
      <h3>{reviewedBy ? 'Reviewed By' : 'Review Status'}</h3>
      <p>
        {reviewedBy || reviewStatus}
      </p>
    </section>
  ) : null;

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
        {attribution}
        {creatorAttr}
        {reviewed}
        {source}
      </div>
      {footer}
    </div>
  );
}
export default FullCard;