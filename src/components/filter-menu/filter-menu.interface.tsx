export interface FilterState {
  nodes: [], // attributes
  flatNodes: {},
  nodeFilters: PrimeAttr,
  categories: [],
  categoriesFilters: {},
  filters: {},
  searchBar: '',
  previousFilters: {
    nodeFilters?: {},
    categoriesFilters?: {},
    searchBar?: ''
  }
};

export interface PrimeAttr {
  [key: string]: {
    checked: boolean;
    partialChecked: boolean
  }
}