import { parseRecords } from "../components/filter-menu/filter-menu.utilities";
import { AirtableCalls, AirtableHelpers } from "./airtable";

export const parseFilterMenu = async () => {
  const records = await AirtableHelpers.callATbase(AirtableCalls.getFilterMenu);
  const nodes = parseRecords(records);
  return ({ nodes });
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
