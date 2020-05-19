import {API_KEY} from '../env.js';

const Airtable = require('airtable');
const base = new Airtable({apiKey: API_KEY}).base('apppSjiUMTolFIo1P');

export async function shallowRows() {
  return base('Engineered Project Pages').select({
    view: "Default View",
    fields: ['Base ID', 'Full Project Name', 'Display Name', 'HeaderImageURL', 'HospitalApproved', 'Review Status'] // contains id by default
    // pageSize: 25
  });
}
