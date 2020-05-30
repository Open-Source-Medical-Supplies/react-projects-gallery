import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownSection = (sectionName, md) => (
  md ?
    <div key={sectionName}>
      <h3>{sectionName}</h3>
      <ReactMarkdown source={md} />
    </div> : null
);

export default MarkdownSection