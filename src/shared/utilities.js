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

export const createUUID = () => Math.round(Math.random() * 10000);

export const MAPPER = {
  CardToJSON: function (card) {
    if (!card) return;
    const name = card['Full Project Name'];
    const displayName = card['Display Name'] ? card['Display Name'][0] : '';  // b/c it's a lookup field in AT?
    const reviewedBy = card['Reviewed By'] ? card['Reviewed By'] : '';
    const reviewStatus = card['Review Status'] ? card['Review Status'][0] : '';
    const imageURL = card.HeaderImageURL !== '#ERROR!' ? card.HeaderImageURL : '';
    const description = card['Description'];
    const externalLink = card['Link'];
    const attributionOrg = card['Attribution Organization'];
    const creator = card['Creator'] || '';
    const osmsNotes = card['OSMS Notes'] || '';
  
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
    }
  },
  ProjectToJSON: function (project) {
    if (!project) return;
    const name      = project['Full Project Name'];
    const webName   = project['web-name'];
    const imageURL  = project['CoverImage'] ? project['CoverImage'][0].thumbnails.large.url : null;
  
    return {
      name,
      imageURL,
      webName
    }
  }
}