import React from 'react';
import PropTypes from 'prop-types';

import './MailingPreview.scss';

import Mail from '../../views/micro/MicropublicationMail';

const MailingPreview = ({
  montage,
  composition,
  assets,
}, {t}) => {
  const {
    metadata: {
      title
    }
  } = composition;
  return (
    <div className="metis-backoffice-MailingPreview">
      <div className="header">
        <div className="row">
          <span className="label">{t('from')}</span>
          <span className="value">Metis team</span>
        </div>
        <div className="row">
          <span className="label">{t('to')}</span>
          <span className="value">The world</span>
        </div>
        <div className="row">
          <span className="label">{t('object')}</span>
          <span className="value">Metis - {title}</span>
        </div>
      </div>
      <div className="body">
        <Mail
          montage={montage}
          composition={composition}
          assets={assets} />
      </div>
    </div>
  );
};

MailingPreview.contextTypes = {
  t: PropTypes.func.isRequired
};

export default MailingPreview;
