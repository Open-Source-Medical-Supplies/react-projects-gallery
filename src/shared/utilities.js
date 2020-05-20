export const OpenExternalSafely = '_blank noopener noreferrer nofollow';

export const openExternal = (link) => () => window.open(link, OpenExternalSafely);