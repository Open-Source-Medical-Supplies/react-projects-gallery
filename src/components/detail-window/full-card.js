import { Button } from 'primereact/button';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import ImageCarousel from '../../shared/components/image-carousel';
import MarkdownSection from '../../shared/components/markdown-p';
import { MAPPER, openExternal } from '../../shared/utilities';

const FullCard = ({selectedCard, materials}) => {
  const {
    name, displayName, reviewedBy, reviewStatus, imageURL, description, hyperLinkText, attributionOrg, creator, osmsNotes, externalLink
  } = MAPPER.ProjectToJSON(selectedCard);

  const headerImage = (
    typeof imageURL !== 'string' ?
      <div className='center-flex' style={{height: '152px'}}>No image available</div> :
      <img className='centered-image' alt={name} src={imageURL} style={{ height: '250px' }}/>
  )

  const desc = (
    <section alt='description'>
      <ReactMarkdown source={description} />
      { MarkdownSection('Notes', osmsNotes) }
    </section>
  );

  const externalLinks = externalLink?.split(';') || [];

  const footer = externalLinks && externalLinks[0] ? ( 
    <span alt='footer' className="full-card__footer">
      <Button
        onClick={openExternal(externalLinks[0])}
        tooltip='Link will open in a new tab'
        label='Make it!'
        icon='pi pi-external-link'
        iconPos='right'
        className="p-button-raised p-button-rounded" />
    </span>
  ) : null;

  return (
    <div className="full-card">
      <div className="full-card__content">
        {headerImage}
        <h1>{name}</h1>
        <h3>{displayName}</h3>
        {desc}
        {
          attributionOrg || creator ?
            <div className='p-grid'>
              {MarkdownSection('Attribution Organization', attributionOrg, 'p-col')}
              {MarkdownSection('Creator', creator, 'p-col')}
            </div> : null
        }
        {MarkdownSection(
          reviewedBy ? 'Reviewed By' : 'Review Status',
          reviewedBy || reviewStatus
        )}
        {MarkdownSection('Sources', hyperLinkText)}
        { materials.length ?
          <ImageCarousel
            links={materials}
            cardClassName='fullcard-carousel-cards'
            formatter={MAPPER.MaterialToCarousel}/> : null }
      </div>
      {footer}
    </div>
  );
}
export default FullCard;