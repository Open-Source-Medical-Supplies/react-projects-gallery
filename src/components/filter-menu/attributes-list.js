import { Panel } from "primereact/panel";
import { Tree } from "primereact/tree";
import React from "react";

const AttributesList = ({nodes, selectionKeys, setSelection}) => {
  return (
    <Panel header='Attributes' toggleable={true} className='attribute-list-panel filter-panel'>
      <Tree
        value={nodes}
        selectionMode="checkbox"
        selectionKeys={selectionKeys}
        onSelectionChange={setSelection}
        filter={true}
        filterPlaceholder="Filter"
      ></Tree>
    </Panel>
  );
};

export default AttributesList;
