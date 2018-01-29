import React from 'react';

import Nav from './Nav';

export default ({
  montage,
  compositions,
}) => (
  <section className="metis-DynamicMontageSection">
    <aside className="aside-menu">
      <Nav montage={montage} compositions={compositions} />
    </aside>

    <section className="main-content-container">
      <h2>{montage.metadata.title.length ? montage.metadata.title : 'Montage sans titre'}</h2>
      {montage.metadata.subtitle && montage.metadata.subtitle.length ? <h3>{montage.metadata.subtitle}</h3> : null}

      <div>
        <p>
          {montage.metadata.description}
        </p>
      </div>

      <div>
        <h3>Table des matières</h3>
        <Nav toggable={false} montage={montage} compositions={compositions} />
      </div>
    </section>

    <style>
      {montage.data.css.shared_css_code}
      {montage.data.css.web_css_code}
    </style>
  </section>
);
