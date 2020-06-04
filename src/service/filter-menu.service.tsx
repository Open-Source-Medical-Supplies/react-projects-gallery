import { parseRecords, flattenRecords } from "../components/filter-menu/filter-menu.utilities";
import { AirtableCalls, AirtableHelpers } from "./airtable";

export const parseFilterMenu = async () => {
  const records = await AirtableHelpers.callATbase(AirtableCalls.getFilterMenu) as unknown as {}[];
  const nodes: {}[] = parseRecords(Object.assign([], records));
  const flatNodes: {}[] = flattenRecords(Object.assign([], records));
  return ({ nodes, flatNodes });
};

export const parseCategories = async () => {
  const records = await AirtableHelpers.callATbase(AirtableCalls.getCategories) as unknown as {}[];
  return ({ categories: records });
};
