import React from 'react';
import Cover from './Cover';


export default ({
  montage: {
    data: {
      cover_color: coverColor,
      title,
      css
    }
  },
  renderingMode = 'epub-fixed'
}) => (
  <div className="StandaloneCover">
    <Cover title={title} background={coverColor} />
    <style>
      {css.shared_css_code}
      {css[`${renderingMode}_css_code`]}
    </style>
  </div>
);
