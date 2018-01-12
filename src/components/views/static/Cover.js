import React from 'react';

export default ({
  title,
  background = '#FFFFFF'
}) => (
  <section
    className="cover break-before"
    style={{
      background
    }}>
    <h1>{title}</h1>
  </section>
);
