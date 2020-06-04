export const OpenExternalSafely = '_blank noopener noreferrer nofollow';

/**
 * 
 * @param {string} link 
 * @returns {Window}
 */
export const openExternal = (link) => () => window.open(link, OpenExternalSafely);

/**
 * 
 * @param {{}} o
 * @returns {boolean}
 */
export const empty = o => !!o && !Object.keys(o).length;
/**
 * 
 * @param {{}} o
 * @returns {boolean}
 */
export const notEmpty = o => !empty(o);

export const allEmpty = o => {
  for (const k in o) {
    const v = o[k];
    if (
      ( typeof v === 'object' && notEmpty(v) ) ||
      ( typeof v === 'string' && !!v.length )
    ) {
      return false;
    }
  }
  return true;
}

export const allNotEmpty = o => !allEmpty(o);

export const createUUID = () => Math.round(Math.random() * 10000);

export const MAPPER = {
  ProjectToJSON: function (project) {
    if (!project) return;
    const name = project['Full Project Name'];
    const displayName = project['Display Name'] ? project['Display Name'][0] : '';  // b/c it's a lookup field in AT?
    const reviewedBy = project['Reviewed By'] ? project['Reviewed By'] : '';
    const reviewStatus = project['Review Status'] ? project['Review Status'][0] : '';
    const imageURL = project.HeaderImageURL !== '#ERROR!' ? project.HeaderImageURL : '';
    const description = project['Description'];
    const externalLink = project['Link'];
    const attributionOrg = project['Attribution Organization'];
    const creator = project['Creator'] || '';
    const osmsNotes = project['OSMS Notes'] || '';
    const useCase = project['Use Case'] || '';
  
    return {
      attributionOrg,
      creator,
      name,
      osmsNotes,
      displayName,
      reviewedBy,
      reviewStatus,
      imageURL,
      description,
      externalLink,
      useCase
    }
  },
  CategoryToJSON: function (category) {
    if (!category) return;
    const name      = category['Display Name'];
    const key       = category['web-name'];
    const imageURL  = category['CoverImage'] ? category['CoverImage'][0].thumbnails.large.url : null;
  
    return {
      name,
      imageURL,
      key
    }
  }
}