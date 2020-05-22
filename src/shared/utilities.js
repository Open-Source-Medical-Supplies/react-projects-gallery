export const OpenExternalSafely = '_blank noopener noreferrer nofollow';

export const openExternal = (link) => () => window.open(link, OpenExternalSafely);

export const empty = (obj) => !Object.keys(obj).length