import { AirtableCalls, AirtableHelpers } from "./airtable";
import { notEmpty } from "../shared/utilities";

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

const getParam = () => window.location && window.location.search ?
    decodeURI(window.location.search.split('project=')[1]) :
    undefined;

export const fetchData = async(setState) => {
  const param = getParam();

  Promise.all([
    parseProjects(),
    parseBoM()
  ]).then(
    (res) => {
      if(param) {
        const selectedCard = res[0]._records.find(r => r['Base ID'] === param) || {};
        setState({
          ...res[0],
          ...res[1],
          selectedCard,
          visible: notEmpty(selectedCard),
        })
      } else {
        setState({ ...res[0], ...res[1] })
      }
    }
  );
}