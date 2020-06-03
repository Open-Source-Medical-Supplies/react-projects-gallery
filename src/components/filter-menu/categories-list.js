import classNames from "classnames";
import { Panel } from 'primereact/panel';
import React, { useEffect, useState } from "react";
import TileCard from "../../shared/components/tile-card";
import { MAPPER } from "../../shared/utilities";
import { DataView } from 'primereact/dataview';

const CategoriesList = ({ setFilterState, categoriesFilters, categories }) => {
  const [toggleState, baseSetToggleState] = useState({});
  const setToggleState = (props) => baseSetToggleState({...toggleState, ...props});

  categories = categories.map(c => MAPPER.CategoryToJSON(c));
  
  useEffect(() => {
    // setToggleState(children?.reduce((acc, category) => {
    //   acc[category.key] = false;
    //   return acc;
    // }, {}));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (key) => () => {
    if (categoriesFilters[key] && toggleState[key]) {
      delete categoriesFilters[key];
      setToggleState({[key]: false});
    } else {
      categoriesFilters[key] = true;
      setToggleState({[key]: true});
    }
    setFilterState({categoriesFilters})
  };

  const CategoryBlock = (o) => {
    const classes = classNames(
      "p-col p-component p-togglebutton", 
      { 'p-highlight': toggleState[o.key] }
    );
    return (
      <TileCard
        actionOnCard
        className={'category-list-card p-col-6'}
        header={o.name}
        imageURL={o.imageURL}
        action={handleClick(o.key)} ></TileCard>
    );
  };
  
  return (
    <Panel header={'Categories'} className='filter-panel' toggleable={true}>
      <DataView value={categories} layout='grid' itemTemplate={CategoryBlock} />
    </Panel>
  );
};
export default CategoriesList;
