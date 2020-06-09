import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownSection = (sectionName, md, className) => (
  md ?
    <div key={sectionName} className={className || ''}>
      <h3>{sectionName}</h3>
      <ReactMarkdown source={md} />
    </div> : null
);

export default MarkdownSection