import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import React from "react";
import ReactMarkdown from "react-markdown";
import { openExternal } from '../utilities';

const ImageCarousel = ({ links, formatter, cardClassName }) => {
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const headerImage = ({header, imageURL}) => (
    typeof imageURL !== 'string' ?
      <div className='center-flex card-header__no-image'>No image</div> :
      <img className='centered-image card-header__image' alt={header} src={imageURL}/>
  )

  const footer = (action) => (
    action ?
      <span style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button onClick={() => action()} label='View' icon={'pi pi-external-link'} iconPos='right' className="p-button-raised p-button-rounded" /> :
      </span> : null
  );

  const ActionCard = ({className, action, imageURL, header, subHeader}) => (
    <button className={className + ' tile-card button-no-style'} onClick={() => action()}>
      <Card header={headerImage({header, imageURL})}>
        <div className='tile-card__header clamp-1'> {header} </div>
        { subHeader ? <ReactMarkdown source={subHeader}/> : null }
      </Card>
    </button>
  );
  const DefaultCard = ({className, imageURL, header, subHeader}) => (
    <Card header={headerImage({header, imageURL})} className={className + ' tile-card'}>
      <div className='tile-card__header clamp-1'> {header} </div>
      { subHeader ? <ReactMarkdown source={subHeader}/> : null }
    </Card> 
  );
  
  const cardTemplate = (data) => {
    const {header, imageURL, externalLink, subHeader} = formatter(data);

    return externalLink ?
      <ActionCard
        header={header}
        subHeader={subHeader}
        imageURL={imageURL}
        className={cardClassName}
        action={openExternal(externalLink)}/> :
      <DefaultCard
        header={header}
        subHeader={subHeader}
        imageURL={imageURL} 
        className={cardClassName}/>;
  };

  return (
    <Carousel
      value={links}
      itemTemplate={cardTemplate}
      numVisible={3}
      numScroll={2}
      responsiveOptions={responsiveOptions}
    ></Carousel>
  );
};

export default ImageCarousel;
