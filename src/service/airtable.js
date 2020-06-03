import {API_KEY} from '../env.js';

const Airtable = require('airtable');
const base = new Airtable({apiKey: API_KEY}).base('apppSjiUMTolFIo1P');

const VIEWS = {
  GRID_VIEW: 'Grid view',
  DEFAULT_GRID: 'Default Grid',
  DEFAULT_VIEW: 'Default View'
};

const filterRecords = r => r.map(({fields}) => fields).filter(field => field.staging !== true)

const callATbase = async (apiCall) => {
  let temp;
  await apiCall().then(
    async data => {
      temp = AirtableHelpers.filterRecords(await data.all());
    },
    e => console.warn(e)
  )
  return temp;
}

export const AirtableHelpers = {
  filterRecords,
  callATbase
}

export const AirtableCalls = {
  getProjects,
  getFilterMenu,
  getCategories,
  getBoM
}

async function getProjects() {
  return base('Engineered Project Pages').select({ view: VIEWS.DEFAULT_VIEW });
}

async function getFilterMenu() {
  return base('ProjectsFilterMenu').select({view: VIEWS.GRID_VIEW});
}

async function getCategories() {
  return base('Medical Supply Categories').select({
    view: VIEWS.DEFAULT_GRID,
    fields: ['web-name', 'Full Project Name', 'CoverImage']
  });
}

async function getBoM() {
  return base('Bill of Materials').select({view: VIEWS.GRID_VIEW});
}
