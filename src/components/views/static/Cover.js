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
  {title}
</section>
);