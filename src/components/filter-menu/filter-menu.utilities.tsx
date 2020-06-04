import { allNotEmpty, MAPPER, notEmpty } from "../../shared/utilities";
import { FilterState } from "./filter-menu.interface";

interface Record {
  key?: string;
  parentKey?: string;
  icon?: string
  children?: Record[];
}
type Records = Record[];
type Filters = {
  categories: {};
  attributes: string[];
  searchBar: string;
}


const buildTree = (data: Record, acc: any = {}) => {
  const { key, parentKey } = data;
  if (parentKey) {
    if (acc[parentKey]) {
      (acc[parentKey].children as Record[]).push(data);
    } else {
      acc[parentKey] = { children: [data] };
    }
  } else {
    if (key) {
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
  }
  return acc;
};

export const parseRecords = (records: Records) => {
  const mappedRecords = records.reduce((acc, record) => {
    if (record.icon) {
      record.icon = "pi " + record.icon;
    }
    buildTree(record, acc);
    return acc;
  }, {}) as unknown as {[key: string]: Record};

  return Object.keys(mappedRecords).map((nodeKey) => mappedRecords[nodeKey]);
};

export const flattenRecords = (records: Records) => {
  return records.reduce((acc: any, val) => {
    if (val && val.key) {
      const vk = val.key;
      acc[vk] = val;
      // I was going to delete the 'key' b/c of redundancy,
      // but the pointers refused to detach and were deleting it elsewhere
    }
    return acc;
  }, {});
};

const processAttributes = (nodeFilters: any, flatNodes: any) => {
  const attrs = [];
  for (const k in nodeFilters) {
    const v = nodeFilters[(k)];
    const notParent = !!flatNodes[k].parentKey;
    if (v.checked && notParent) {
      attrs.push(k);
    }
  }
  return attrs;
};

const combineFilters = (filterState: FilterState): Filters => {
  const { categoriesFilters, searchBar, nodeFilters, flatNodes } = filterState;
  return {
    categories: categoriesFilters,
    attributes: processAttributes(nodeFilters, flatNodes),
    searchBar,
  };
};

const checkAttributes = (attrs: string[], projectJSON: any, flatNodes: any) => {
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

const checkSearchString = (target: string, projectJSON: ReturnType<typeof MAPPER.ProjectToJSON>) => {
  if (target.length) {
    const {name, displayName} = projectJSON;
    return (
      name.toLowerCase().includes(target.toLowerCase()) ||
      displayName.toLowerCase().includes(target.toLowerCase())
    );
  }
  return false;
};

const checkCategories = (cats: any, projectJSON: ReturnType<typeof MAPPER.ProjectToJSON>) => {
  if (Object.keys(cats).length) {
    return cats[projectJSON.displayName];
  }
  return false;
};

// const noFalsePositives = (attrs: any) => {
//   for (const k in attrs) {
//     const v = attrs[k];
    
//   }
//   checked, partialChecked
// }

const stricterFiltering = (filters: Filters) => {
  // if there are more filters than the previous state
  const byAttributes = notEmpty(filters.attributes);
  const byCategories = notEmpty(filters.categories);
  const byText = !!filters.searchBar.length;
  const current = +byAttributes + +byCategories + +byText;
  
  const prevByAttributes = notEmpty(filters.attributes);
  const prevByCategories = notEmpty(filters.categories);
  const prevByText = !!filters.searchBar.length;
  const prev = +prevByAttributes + +prevByCategories + +prevByText;

  return current > prev;
}

export const filterBy = (filterState: FilterState, _records: Records, records: Records) => {
  const filters = combineFilters(filterState);

  if (allNotEmpty(filters)) {
    const recordsBase = stricterFiltering(filters) ? records : _records;

    return recordsBase.reduce((acc: Records, project) => {
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
          debugger
          if (checkAttrs && checkText && checkCats) {
            acc.push(project);
          }
          return acc;
        }
        if (moreThanOneFilterButNotAll) {
          debugger
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
        debugger
        acc.push(project);
      }
      return acc;
    }, []);
  }
  return _records;
};
