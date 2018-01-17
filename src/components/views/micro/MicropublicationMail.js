import React from 'react';

import Oy from 'oy-vey';
const {
  Table,
  TBody,
  TR: Tr,
  TD: Td
} = Oy;


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
    }
}) => (
  <Table>
    <TBody>
      <Tr>
        <Td align="left">
          <b><a href={montageUrl}>{title}</a></b>
          <br />
          {includeAbstract && <p>
              {abstractOriginal}
            </p>}

          {attachedAssets &&
          <div>
          <br />
          <br />
            
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
        }
        </Td>
      </Tr>
    </TBody>
  </Table>
);
