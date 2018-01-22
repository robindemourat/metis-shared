import React from 'react';
import Cover from './Cover';


export default ({
  montage: {
    metadata: {
      title,
      subtitle,
      creators,
    },
    data: {
      cover_color: coverColor,
      css
    }
  },
  renderingMode = 'epub-fixed',
  styles = '',
}) => (
  <html className="metis-StandaloneCover">
    <head />
    <body>
      <Cover
        title={title}
        background={coverColor}
        subtitle={subtitle}
        creators={creators} />
      <style>
        {styles}
        {css.shared_css_code}
        {css[`${renderingMode}_css_code`]}
      </style>
    </body>
  </html>
);
