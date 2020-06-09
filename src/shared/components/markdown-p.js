import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownSection = (sectionName, md, className = '', force = false) => (
  md || force ?
    <div key={sectionName} className={className || ''}>
      <h3>{sectionName}</h3>
      <ReactMarkdown source={md} />
    </div> : null
);

export default MarkdownSection