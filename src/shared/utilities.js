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
