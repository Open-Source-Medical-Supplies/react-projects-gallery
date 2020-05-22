import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import React, { useState, useEffect } from "react";
import classNames from "classnames";

const CategoriesList = ({ setFilterState, categoriesFilters, categories: {parent, children} }) => {
  const [toggleState, baseSetToggleState] = useState({});
  const setToggleState = (props) => baseSetToggleState({...toggleState, ...props});
  
  useEffect(() => {
    setToggleState(children?.reduce((acc, category) => {
      acc[category.key] = false;
      return acc;
    }, {}));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (key) => {
    if (categoriesFilters[key] && toggleState[key]) {
      delete categoriesFilters[key];
      setToggleState({[key]: false});
    } else {
      categoriesFilters[key] = true;
      setToggleState({[key]: true});
    }
    setFilterState({categoriesFilters})
  };

  const CategoryBlock = ({data}) => {
    const classes = classNames(
      "p-col p-component p-togglebutton", 
      { 'p-highlight': toggleState[data.key] }
    );
    return (
      <Button onClick={() => handleClick(data.key)} label={data.label} className={classes}>
        <FontAwesomeIcon icon={data.icon} />
      </Button>
    );
  };

  return (
    <Panel header={parent?.label} toggleable={true}>
      <div className='p-grid'>
        { children.map(category => (
          <CategoryBlock key={category.key} data={category}></CategoryBlock>
        )) }
      </div>
    </Panel>
  );
};
export default CategoriesList;
