import React from 'react';

export default ({
  children,
  to: {
    view,
    index,
    // parameters,
  },
  // ...props,
}) => {
  let finalHref;
  switch (view) {
    case 'composition':
      finalHref = `composition-${index}.xhtml`;
      break;
    default:
      break;
  }
  if (finalHref) {
    return (
      <a href={finalHref}>
        {children}
      </a>
    );
  }
  return null;
};
