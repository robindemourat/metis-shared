import React from 'react';

const getColorByBgColor = (bgColor) => {
    if (!bgColor) {
 return '';
}
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
};

export default ({
  title,
  background = '#FFFFFF',
  subtitle,
  creators = []
}) => (
  <section
    className="cover break-after static-section">
    <div
      className="content"
      style={{
      background,
      color: getColorByBgColor(background)
    }}>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}

      {
      creators.length ?
        <div className="creators">
          {
          creators.map((creator, index) => (
            <span className="creator" key={index}>
              {!!index && ', '}
              {creator.given} {creator.family}
            </span>
          ))
        }
        </div>
      : null
    }
    </div>
  </section>
);
