import React from 'react';

export const OpenExternalSafely = '_blank noopener noreferrer nofollow';

export const openExternal = (link: string) => () => window.open(link, OpenExternalSafely);

export const AopenExternal = (href: string, children: any) => <a href={href} target='_blank' rel='noopener noreferrer nofollow'>{children}</a>

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

export class CategoryComparator {
  state: any;
  previous: any;

  compareKeys (state: {}, previous: {}): boolean {
    if (state === this.state && previous === this.previous) {
      return false;
    }
    this.state = state;
    this.previous = previous;
  // false if previous is empty
  // true if key lengths are different
  // true if key lengths are equal but keys are different
  // false if the 'same' object (mem pointers not withstanding)
  const a = Object.keys(state);
  const b = Object.keys(previous);
  if (a < b || a > b) {
    return true;
  }
  for(const k in a) {
    if (!b[k]) {
       return true;
    }
  }
  return false;
}
}

export const noFalsePositives = (objects: {[k: string]: {[k: string]: any}} | {[k: string]: boolean}, invert = false): boolean => {
  let check = invert ? true : false;
  for (const k in objects) {
    const o = objects[k]; // Object.keys(bool) => []

    if (typeof o === 'boolean') {
      if (o) {
        check = invert ? false : true;
        return check;
      }
    } else {
      for (const j in o) {
        if (o[j]) {
          check = invert ? false : true;
          return check;
        }
      }
    }
  }
  return check;
}

export const createUUID = () => Math.round(Math.random() * 10000);

export type ProjectJSON = ReturnType<typeof MAPPER.ProjectToJSON>;
export type CategoryJSON = ReturnType<typeof MAPPER.CategoryToJSON>;

export const MAPPER = {
  ProjectToJSON: function (project: any) {
    if (!project) return {};
    const name = project['Full Project Name'];
    const displayName = project['Display Name'] ? project['Display Name'][0] : '';  // b/c it's a lookup field in AT?
    const reviewedBy = project['Reviewed By'] ? project['Reviewed By'] : '';
    const medicalStatus = project['Medical Status'] ? project['Medical Status'][0] : '';
    const imageURL = project.HeaderImageURL !== '#ERROR!' ? project.HeaderImageURL : '';
    const description = project['Description'];
    const externalLink = project['Link'];
    const hyperLinkText = project['Hyperlink Text'];
    const attributionOrg = project['Attribution Organization'];
    const creator = project['Creator'] || '';
    const osmsNotes = project['OSMS Notes'] || '';
    const useCase = project['Use Case'] || '';
    const audience = project['Audience'] || [];
    const generalSkillsTools = project['General Skills/Tools'] || [];
    const difficulty = project['Difficulty'] || [];
    const projectType = project['Project Type'] || [];
  
    return {
      attributionOrg,
      audience,
      creator,
      description,
      difficulty,
      displayName,
      externalLink,
      generalSkillsTools,
      imageURL,
      name,
      osmsNotes,
      reviewedBy,
      medicalStatus,
      useCase,
      projectType,
      hyperLinkText
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
  },
  MaterialToJSON: (data: any) => {
    if (!data) return {};
    const name          = data['Full Project Name'];
    const idealCaption  = data['Ideal Material Name'];
    const imageURL      = data['Image'] ? data['Image'][0].thumbnails.large.url : null;
    const detail        = data['Detail'] || '';
    const fn            = data['Function'] || '';
  
    return {
      name,
      idealCaption,
      imageURL,
      detail,
      fn
    }
  },
  MaterialToCarousel: (data: any) => {
    data = MAPPER.MaterialToJSON(data);
    return {
      header: data.idealCaption,
      subHeader: data.detail || '',
      imageURL: data.imageURL,
    }
  }
}