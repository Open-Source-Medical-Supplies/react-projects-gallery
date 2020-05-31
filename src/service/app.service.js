import { getCategories, getProjects, AirtableHelpers } from "./airtable";

/**
 * @returns {Promise<{
  records: {};
  _records: {};
 }>}
*/
export const parseProjects = async () => {
  let temp;
  await getProjects().then(async(projects) => {
    const records = await projects.all();
    const simpleRecords = AirtableHelpers.filterRecords(records);
    temp = {records: simpleRecords, _records: simpleRecords}
  });
  return temp;
};

/**
 * @returns {Promise<{
  categories: {};
 }>}
 */
export const parseCategories = async () => {
  let temp;
  await getCategories().then(async(rows) => {
    const records = await rows.all();
    const simpleRecords = AirtableHelpers.filterRecords(records);
    temp = {
      categories: simpleRecords
    };
  });
  return temp;
};
