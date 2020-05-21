export const parseRecords = (records) => {
  const mappedRecords = records.reduce((acc, {fields}) => {
    const {key, parentKey} = fields;
    if(fields.icon) {
      fields.icon = 'pi ' + fields.icon;
    }
    // categories
    if (key === 'categories') {
      acc.categories.parent = fields;
      return acc;
    }
    if (parentKey === 'categories') {
      acc.categories.children.push(fields);
      return acc;
    }
    // end categories
    // nodes
    if (parentKey) {
      if (acc.nodes[parentKey]) {
        acc.nodes[parentKey].children.push(fields);
      } else {
        acc.nodes[parentKey] = {
          parent: null,
          children: [fields]
        };
      }
    } else {
      if (acc.nodes[key]) {
        acc.nodes[key] =  {
          ...fields,
          children: acc.nodes[key].children
        };
      } else {
        acc.nodes[key] = {
          ...fields,
          children: []
        };
      }
    }
    // end nodes
    return acc;
  }, {
    categories: {
      parent: null,
      children: []
    },
    nodes: {}
  });

  const nodeKeys = Object.keys(mappedRecords.nodes);
  return {
    categories: mappedRecords.categories,
    nodes: nodeKeys.map(nodeKey => mappedRecords.nodes[nodeKey])
  }
};
