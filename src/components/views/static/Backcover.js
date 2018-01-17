import React from 'react';

export default ({
  title,
  background = '#FFFFFF',
  text
}) => (
  <section
    className="back-cover break-before"
    style={{
      background
    }}>
    <h1>{title}</h1>
    <p>
      {text}
    </p>
  </section>
);
