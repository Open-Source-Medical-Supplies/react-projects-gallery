import { notEmpty } from "../../shared/utilities";

const buildTree = (data, acc = {}) => {
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

const flattenTree = (arrData) => {
  // should make this properly recursive at some point
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

const filtersAsTree = (nodes, filters) => {
  const filterKeys = Object.keys(filters);
  const flattenedNodes = flattenTree(nodes);

  const data = filterKeys.reduce((acc, key) => {
    const {parentKey, label, columnHeader} = flattenedNodes[key];
    acc.push({ key, parentKey, label, columnHeader, ...filters[key] });
    return acc;
  }, []);
  
  return data.reduce((acc, field) => buildTree(field, acc), {});
}

const combineFilters = (...filters) => {
  // ??
  return {...filters}
}

const checkNodes = (nodes, target) => {
  if (nodes.length) {
    return nodes.some(node => node.label === target)
  }
  return false;
}

export const filterBy = (filterState, _records) => {
  // combineFilters // ??
  if (notEmpty(filterState.nodeFilters)) {
    const {nodes, nodeFilters} = filterState;
    const treedFilters = filtersAsTree(nodes, nodeFilters)
    const treedKeys = Object.keys(treedFilters);

    return _records.reduce((acc, record) => {
      let recordAdded = false;
      treedKeys.forEach(baseKey => {
        if(!recordAdded) {
          const filter = treedFilters[baseKey];
          const {children} = filter;
          const columnKey = filter.columnHeader || filter.label;
          const colVal = record[columnKey];
          if (colVal && checkNodes(children, colVal)) {
            acc.push(record);
            recordAdded = true;
          }
        }
      });
      return acc;
    }, []);
  }
  return _records;
}
