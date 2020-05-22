import { empty } from "../../shared/utilities";

export const parseRecords = (fields) => {
  const mappedRecords = fields.reduce((acc, field) => {
    const {key, parentKey} = field;
    // categories
    if (key === 'categories') {
      acc.categories.parent = field;
      return acc;
    }
    if (parentKey === 'categories') {
      acc.categories.children.push(field);
      return acc;
    }
    // end categories
    if(field.icon) {
      field.icon = 'pi ' + field.icon;
    }
    // nodes
    buildTree(field, acc.nodes);
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
    nodes: nodeKeys.map(nodeKey => mappedRecords.nodes[nodeKey]) // this feels hacky
  }
};

export const buildTree = (data, acc = {}) => {
  const {key, parentKey} = data;
  if (parentKey) {
    if (acc[parentKey]) {
      acc[parentKey].children.push(data);
    } else {
      acc[parentKey] = {
        parent: null,
        children: [data]
      };
    }
  } else {
    if (acc[key]) {
      acc[key] =  {
        ...data,
        children: acc[key].children
      };
    } else {
      acc[key] = {
        ...data,
        children: []
      };
    }
  }
  return acc;
}

export const flattenTree = (arrData) => {
  // should make this properly recursive at some point but that's for a more rested brain
  const acc = {};
  arrData.forEach(node => {
    acc[node.key] = node;
    if (node.children) {
      node.children.forEach(child => {
        acc[child.key] = child;
      })
    }
  });
  return acc;
}

export const filtersAsTree = (nodes, filters) => {
  // I need to stop doing (complex) tree operations at the end of the day. Headaches abound.
  const filterKeys = Object.keys(filters);
  const flattenedNodes = flattenTree(nodes);

  const data = filterKeys.reduce((acc, key) => {
    const {parentKey, label} = flattenedNodes[key];
    acc.push({ key, parentKey, label, ...filters[key] });
    return acc;
  }, []);
  
  return data.reduce((acc, field) => buildTree(field, acc), {});
}

export const combineFilters = (...filters) => {
  // ??
  return {...filters}
}

export const filterBy = (filterState, _records) => {
  // combineFilters // ??
  if (!empty(filterState.nodeFilters)) {
    const {nodes, nodeFilters} = filterState;
    const treedFilters = filtersAsTree(nodes, nodeFilters)
    const treedKeys = Object.keys(treedFilters);

    const filteredRecords = Object.assign([], _records).reduce((acc, record) => {
      let recordAdded = false;
      treedKeys.forEach(baseKey => {
        const columnKey = treedFilters[baseKey].label;
        if (!recordAdded && record[columnKey]) {
          const colVal = record[columnKey];
          // will always have children, else something is wrong
          if( treedFilters[baseKey].children.some(child => child.label === colVal)) {
            acc.push(record);
            recordAdded = true;
          }
        }
      });
      return acc;
    }, []);
    debugger
    return filteredRecords;
  } else {
    return _records;
  }
}
