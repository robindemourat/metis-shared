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
  text
}) => (
  <section
    className="back-cover break-before plurishing-StaticMontageSection">
    <div
      className="content"
      style={{
      background,
      color: getColorByBgColor(background)
    }}>
      <h1 className="backcover-title">{title}</h1>
      <p className="backcover-abstract">
        {text}
      </p>
    </div>
  </section>
);
