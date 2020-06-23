import { Button } from 'primereact/button';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import ImageCarousel from '../../shared/components/image-carousel';
import MarkdownSection from '../../shared/components/markdown-p';
import { MAPPER, openExternal, AopenExternal } from '../../shared/utilities';

const FullCard = ({selectedCard, materials}) => {
  const {
    name, displayName, reviewedBy, medicalStatus, imageURL, description, hyperLinkText, attributionOrg, creator, osmsNotes, externalLink
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
        className="p-button-raised p-button-rounded margin-z-auto" />
    </span>
  ) : null;

  const linkOut = window.location.pathname + '?category=' + encodeURI(displayName);

  return (
    <div className="full-card">
      <div className="full-card__content">
        {headerImage}
        <h1>{name}</h1>
        {AopenExternal(linkOut, <h2>{displayName}</h2>)}
        {desc}
        {
          attributionOrg || creator ?
            <div className='p-grid'>
              {MarkdownSection('Attribution Organization', attributionOrg, 'p-col')}
              {MarkdownSection('Creator', creator, 'p-col')}
            </div> : null
        }
        {MarkdownSection(medicalStatus, reviewedBy, '', true)}
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