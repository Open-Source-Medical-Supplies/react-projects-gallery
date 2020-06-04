export const OpenExternalSafely = '_blank noopener noreferrer nofollow';

export const openExternal = (link: string) => () => window.open(link, OpenExternalSafely);

export const empty = (o: object): boolean => !!o && !Object.keys(o).length;

export const notEmpty = (o: {}): boolean => !empty(o);

export const allEmpty = (o: any): boolean => {
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

export const allNotEmpty = (o: {}): boolean => !allEmpty(o);

export const createUUID = () => Math.round(Math.random() * 10000);

export type ProjectJSON = ReturnType<typeof MAPPER.ProjectToJSON>;
export type CategoryJSON = ReturnType<typeof MAPPER.CategoryToJSON>;

export const MAPPER = {
  ProjectToJSON: function (project: any) {
    if (!project) return {};
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
  CategoryToJSON: function (category: any) {
    if (!category) return {};
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