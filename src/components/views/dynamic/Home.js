import React from 'react';

import Nav from './Nav';

export default ({
  montage,
  compositions,
}) => (
  <section className="plurishing-MontageSection">
    <aside className="aside-menu">
      <Nav montage={montage} compositions={compositions} />
    </aside>

    <section className="main-content-container">
      <h2>{montage.metadata.title || 'Montage sans titre'}</h2>

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
