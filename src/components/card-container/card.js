import classNames from "classnames";
import React from 'react';
import TileCard from '../../shared/components/tile-card';
import { MAPPER } from '../../shared/utilities';

/**
 * 
 * @param {string} param 
 * @returns void
 */
const updateQueryParam = (param) => {
  // update url w/o page reload
  if (!param) return;
  if (window.history && window.history.pushState) {
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?project=' + encodeURI(param);
    window.history.pushState({ path: newurl }, '', newurl);
  } else {
    alert('Please update your browser version');
  }
}

const ProjectCard = ({data, setCard, selectedCard}) =>{
  const {
    name, displayName, imageURL, baseID // medicalStatus -> caduceus icon
  } = MAPPER.ProjectToJSON(data);

  const selectCard = () => {
    updateQueryParam(baseID);
    setCard({selectedCard: data, visible: true});
  };
  
  const selectedName = selectedCard['Full Project Name'];

  const card = classNames('action-card', {
    "card-selected": !!selectedName && selectedName === name,
  });
  const sizing = classNames({
    'p-col-3': !selectedName,   // default
    'p-col-6': !!selectedName   // a card is selected
  })
  return (
    <div key={name} className={sizing}>
      <TileCard
        header={name}
        subHeader={displayName}
        imageURL={imageURL}
        className={card}
        action={selectCard} />
    </div>
  );
}
export default ProjectCard;