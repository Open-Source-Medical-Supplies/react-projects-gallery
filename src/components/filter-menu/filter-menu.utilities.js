import { notEmpty, createUUID } from "../../shared/utilities";

export function attachUUID(nodes) {
  // this requires a bit of weaving to integrate, better to just have unique names in the DB
  return nodes.map(node => {
    node.key += '-' + createUUID()
    if (node.children) {
      node.children = attachUUID(node.children);
    }
    return node;
  });
}

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
    if(field.icon) {
      field.icon = 'pi ' + field.icon;
    }
    // nodes
    buildTree(field, acc.nodes);
    // end nodes
    return acc;
  }, {});

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

/**
 * builds a tree from flattened filters,
  pulling the relationship from the previously built (now flattened) menu nodes
*/
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

/**
 * 
 * @param {{label: string}[]} nodes 
 * @param {string} target 
 * @returns {boolean}
 */
const checkNodes = (nodes, target) => {
  if (nodes.length) {
    return nodes.some(node => {
      return (
        node.label === target ||
        node.label.includes(target) ||
        target.includes(node.label)
      );
    });
  }
  return false;
}

/**
 * 
 * @param {
    { [filterKey: string]: {
      checked: false;
      partialChecked: false;
    }}
  } filters
 * @returns {boolean}
 */
const noFalsePositives = (filters) => {
  for (let filterKey of Object.keys(filters)) {
    if (filters[filterKey].checked || filters[filterKey].partialChecked){
      return true;
    }
  }
  return false
};

export const filterBy = (filterState, _records) => {
  // combineFilters // ??
  const filters = filterState.nodeFilters

  
  if (notEmpty(filters) && noFalsePositives(filters)) {
    const {nodes, nodeFilters} = filterState;
    const treedFilters = filtersAsTree(nodes, nodeFilters)
    const treedFilterKeys = Object.keys(treedFilters);

    return _records.reduce((acc, record) => {
      let recordAdded = false;
      treedFilterKeys.forEach(filterKey => {
        if(!recordAdded) {
          const filter = treedFilters[filterKey];
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
