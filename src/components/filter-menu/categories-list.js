import classNames from "classnames";
import { DataView } from 'primereact/dataview';
import { Panel } from 'primereact/panel';
import React, { useState } from "react";
import TileCard from "../../shared/components/tile-card";
import { MAPPER } from "../../shared/utilities";

const CategoriesList = ({ setFilterState, categoriesFilters, categories }) => {
  const [toggleState, baseSetToggleState] = useState({});
  const setToggleState = (props) => baseSetToggleState({...toggleState, ...props});

  categories = categories.map(c => MAPPER.CategoryToJSON(c));
  
  const handleClick = k => {
    if (categoriesFilters[k] && toggleState[k]) {
      delete categoriesFilters[k];
      setToggleState({[k]: false});
    } else {
      categoriesFilters[k] = true;
      setToggleState({[k]: true});
    }
    setFilterState({categoriesFilters});
    console.log(categoriesFilters)
  };

  const CategoryBlock = (o) => {
    const classes = classNames(
      'category-list-card p-col-6',
      { 'highlight-child': toggleState[o.name] }
    );
    return (
      <TileCard
        actionOnCard
        action={() => handleClick(o.name)}
        className={classes}
        header={o.name}
        imageURL={o.imageURL}></TileCard>
    );
  };
  
  return (
    <Panel header={'Categories'} className='filter-panel' toggleable={true}>
      <DataView value={categories} layout='grid' itemTemplate={CategoryBlock} />
    </Panel>
  );
};
export default CategoriesList;
