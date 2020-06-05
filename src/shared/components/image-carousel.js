import { Carousel } from "primereact/carousel";
import React from "react";
import { openExternal } from '../utilities';
import TileCard from "./tile-card";

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
  
  const cardTemplate = (data) => {
    const {header, imageURL, externalLink} = formatter(data);

    return externalLink ? 
      <TileCard
        header={header}
        imageURL={imageURL}
        className={cardClassName}
        buttonIcon='external-link'
        action={openExternal(externalLink)}/> :
      <TileCard
        header={header}
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
