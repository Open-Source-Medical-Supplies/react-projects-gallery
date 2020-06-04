import {
  allNotEmpty,
  createUUID,
  MAPPER,
  notEmpty,
} from "../../shared/utilities";

export function attachUUID(nodes) {
  // this requires a bit of weaving to integrate, better to just have unique names in the DB
  return nodes.map((node) => {
    node.key += "-" + createUUID();
    if (node.children) {
      node.children = attachUUID(node.children);
    }
    return node;
  });
}

const buildTree = (data, acc = {}) => {
  const { key, parentKey } = data;
  if (parentKey) {
    if (acc[parentKey]) {
      acc[parentKey].children.push(data);
    } else {
      acc[parentKey] = {
        parent: null,
        children: [data],
      };
    }
  } else {
    if (acc[key]) {
      acc[key] = {
        ...data,
        children: acc[key].children,
      };
    } else {
      acc[key] = {
        ...data,
        children: [],
      };
    }
  }
  return acc;
};

export const parseRecords = (records) => {
  const mappedRecords = records.reduce((acc, record) => {
    if (record.icon) {
      record.icon = "pi " + record.icon;
    }
    buildTree(record, acc);
    return acc;
  }, {});

  return Object.keys(mappedRecords).map((nodeKey) => mappedRecords[nodeKey]);
};

export const flattenRecords = (records) => {
  return records.reduce((acc, val) => {
    const vk = val.key;
    acc[vk] = val;
    // I was going to delete the 'key' b/c of redundancy,
    // but the pointers refused to detach and were deleting it elsewhere
    return acc;
  }, {});
};

const processAttributes = (nodeFilters, flatNodes) => {
  const attrs = [];
  for (const k in nodeFilters) {
    const v = nodeFilters[k];
    const notParent = !!flatNodes[k].parentKey;
    if (v.checked && notParent) {
      attrs.push(k);
    }
  }
  return attrs;
};

const combineFilters = (filterState) => {
  const { categoriesFilters, searchBar, nodeFilters, flatNodes } = filterState;
  return {
    categories: categoriesFilters,
    attributes: processAttributes(nodeFilters, flatNodes),
    searchBar,
  };
};

const checkAttributes = (attrs, projectJSON, flatNodes) => {
  console.warn("you need to do something about Audience");
  if (Object.keys(attrs).length) {
    for (const i in attrs) {
      const attr = flatNodes[attrs[i]];
      const target = attr.label;
      const pKey = flatNodes[attr.parentKey].key;
      const pVal = projectJSON[pKey];
      if (pVal && pVal === target) {
        return true;
      }
    }
  }
  return false;
};

const checkSearchString = (target, projectJSON) => {
  if (target.length) {
    return (
      projectJSON.name.includes(target) ||
      projectJSON.displayName.includes(target)
    );
  }
  return false;
};

const checkCategories = (cats, projectJSON) => {
  if (Object.keys(cats).length) {
    return cats[projectJSON.displayName];
  }
  return false;
};

export const filterBy = (filterState, _records, records) => {
  const filters = combineFilters(filterState);
  // project.displayName === category.displayName

  if (allNotEmpty(filters)) {
    const recordsBase = _records.length >= records.length ? records : _records;
    debugger;
    return recordsBase.reduce((acc, project) => {
      const projectJSON = MAPPER.ProjectToJSON(project);
      const checkAttrs = checkAttributes(
        filters.attributes,
        projectJSON,
        filterState.flatNodes
      );
      const checkText = checkSearchString(filters.searchBar, projectJSON);
      const checkCats = checkCategories(filters.categories, projectJSON);

      const filteringByAttributes = notEmpty(filters.attributes);
      const filteringByText = !!filters.searchBar.length;
      const filteringByCategories = notEmpty(filters.categories);
      
      const filterByAll = filteringByAttributes && filteringByText && filteringByCategories;
      const moreThanOneFilterButNotAll =
        (filteringByAttributes && filteringByText) ||
        (filteringByAttributes && filteringByCategories) ||
        (filteringByText && filteringByCategories);

      if (filterByAll) {
        if (checkAttrs && checkText && checkCats) {
          acc.push(project);
        }
        return acc;
      }
      if (moreThanOneFilterButNotAll) {
        if (
          (checkAttrs && checkText) ||
          (checkAttrs && checkCats) ||
          (checkText && checkCats)
        ) {
          acc.push(project);
        }
        return acc;
      }
      // one filter
      if (checkAttrs || checkText || checkCats) {
        acc.push(project);
      }
      return acc;
    }, []);
  }
  return _records;
};
