import { parseRecords } from "../components/filter-menu/filter-menu.utilities";
import { AirtableCalls, AirtableHelpers } from "./airtable";

export const parseFilterMenu = async () => {
  const records = await AirtableHelpers.callATbase(AirtableCalls.getFilterMenu);
  const nodes = parseRecords(records);
  const flatNodes = records.reduce((acc, val) => {
    const vk = val.key;
    acc[vk] = val;
    delete acc[vk].key;
    return acc;
  },{});
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
