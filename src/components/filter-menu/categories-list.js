import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import React from "react";

const CategoriesList = ({ categories: {parent, children} }) => {
  // const [state, setState] = useState({
  //   open: true,
  //   list,
  // });
  const handleClick = () => {
    // setState({ ...state, open: !state.open });
  };

  const CategoryBlock = ({data}) => (
    <Button
      className='p-col'
      label={data.label}
      onClick={handleClick}
      >
      <FontAwesomeIcon icon={data.icon} />
    </Button>
  );

  return (
    <Panel header={parent?.label} toggleable={true}>
      <div className='p-grid'>
        {
          children?.map(category => <CategoryBlock key={category.label} data={category}></CategoryBlock>)
        }
      </div>
    </Panel>
  );
};
export default CategoriesList;
