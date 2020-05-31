import {API_KEY} from '../env.js';

const Airtable = require('airtable');
const base = new Airtable({apiKey: API_KEY}).base('apppSjiUMTolFIo1P');

const VIEWS = {
  GRID_VIEW: 'Grid view',
  DEFAULT_GRID: 'Default Grid',
  DEFAULT_VIEW: 'Default View'
};

export const AirtableHelpers = {
  filterRecords: (r) => r.map(({fields}) => fields).filter(field => field.staging !== true)
}

export async function getProjects() {
  return base('Engineered Project Pages').select({ view: VIEWS.DEFAULT_VIEW });
}

export async function getFilterMenu() {
  return base('ProjectsFilterMenu').select({view: VIEWS.GRID_VIEW});
}

export async function getCategories() {
  return base('Medical Supply Categories').select({
    view: VIEWS.DEFAULT_GRID,
    fields: ['web-name', 'Display Name', 'CoverImage']
  });
}

export async function getBoM() {
  return base('Bill of Materials').select({view: VIEWS.GRID_VIEW});
}
