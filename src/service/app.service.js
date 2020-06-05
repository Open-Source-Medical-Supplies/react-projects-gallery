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

/**
 * @returns {Promise<{materials: {}}>}
*/
export const parseBoM = async () => {
  const materials = await AirtableHelpers.callATbase(AirtableCalls.getBoM);
  return {materials: bomParse(materials)};
};

/**
 * 
 * @param {[]} materials
 * @returns {{}}
 */
const bomParse = (materials) => {
  return materials.reduce((acc, material) => {
    const matID = material['Full Project Name'];
    const mat = acc[matID] || [];
    mat.push(material);
    acc[matID] = mat; // this (mat) could be sorted, but materials should be coming in in ID order already
    return acc;
  }, {});
}
