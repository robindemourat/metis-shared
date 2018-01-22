import React from 'react';

import './FacebookPreview.scss';

export default ({
  assets,
  montage: {
    data: {
      include_abstract: includeAbstract,
      montage_url: montageUrl,
      attached_assets: attachedAssets = []
    },
  },
  composition: {
      metadata: {
        title,
        abstract_original: abstractOriginal
      }
    },
  profileImageUri
}) => {
  return (
    <div className="metis-backoffice-FacebookPreview">
      <div className="header">
        <div className="left">
          <img className="profile-image" src={profileImageUri} />
        </div>
        <div className="right">
          <div className="row">
            <h3 className="fb-important">Metis</h3>
            <p className="post-info">Publié par Michel · 8 mars 2016 </p>
          </div>
        </div>
      </div>
      <div className="body">
        <b>{title}</b>
        <br />
        {includeAbstract && <p>
            {abstractOriginal}
          </p>}
        <p>
          {montageUrl}
        </p>
      </div>
      <div className="images">
        {
          attachedAssets.map(citation => {
            const {image_asset_id: imageAssetId} = citation;
             return assets[imageAssetId];
          })
          .filter(a => a)
          .map((base64, index) => (
            <img key={index} src={base64} />
          ))
        }
      </div>
    </div>
  );
};
