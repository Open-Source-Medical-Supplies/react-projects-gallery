import {API_KEY} from '../env.js';

const Airtable = require('airtable');
const base = new Airtable({apiKey: API_KEY}).base('apppSjiUMTolFIo1P');

const GRID_VIEW = 'Grid view'

export async function getRows() {
  return base('Engineered Project Pages').select({
    view: "Default View",
    // fields: ['Base ID', 'Full Project Name', 'Display Name', 'HeaderImageURL', 'HospitalApproved', 'Review Status'] // contains id by default
    // pageSize: 25
  });
}
export async function getFilterMenu() {
  return base('ProjectsFilterMenu').select({view: GRID_VIEW});
}

export async function getBoM() {
  return base('Bill of Materials').select({view: GRID_VIEW});
}
