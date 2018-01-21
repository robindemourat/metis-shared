import React from 'react';

export default ({
  children,
  className,
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
      <a className={className} href={finalHref}>
        {children}
      </a>
    );
  }
  return null;
};
