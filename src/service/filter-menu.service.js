import { parseRecords, flattenRecords } from "../components/filter-menu/filter-menu.utilities";
import { AirtableCalls, AirtableHelpers } from "./airtable";

export const parseFilterMenu = async () => {
  const records = await AirtableHelpers.callATbase(AirtableCalls.getFilterMenu);
  const nodes = parseRecords(Object.assign([], records));
  const flatNodes = flattenRecords(Object.assign([], records));
  return ({ nodes, flatNodes });
};

/**
 * @returns {Promise<{
    categories: {};
}>}
*/
export const parseCategories = async () => {
  const records = await AirtableHelpers.callATbase(AirtableCalls.getCategories);
  return ({ categories: records });
};
