import React from 'react';
import Cover from './Cover';


export default ({
  montage: {
    metadata: {
      title,
    },
    data: {
      cover_color: coverColor,
      css
    }
  },
  renderingMode = 'epub-fixed',
  styles = '',
}) => (
  <html className="StandaloneCover">
    <head></head>
    <body>
      <Cover title={title} background={coverColor} />
      <style>
        {styles}
        {css.shared_css_code}
        {css[`${renderingMode}_css_code`]}
      </style>
    </body>
  </html>
);
