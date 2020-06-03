import { AirtableCalls, AirtableHelpers } from "./airtable";

/**
 * @returns {Promise<{
  records: {};
  _records: {};
 }>}
*/
export const parseProjects = async () => {
  const records = await AirtableHelpers.callATbase(AirtableCalls.getProjects);
  return {records, _records: records};
};
