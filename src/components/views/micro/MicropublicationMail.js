import React from 'react';

import Oy from 'oy-vey';
const {
  Table,
  TBody,
  TR: Tr,
  TD: Td
} = Oy;


export default ({
  montage: {
    data: {
      include_abstract: includeAbstract,
      montage_url: montageUrl
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
        </Td>
      </Tr>
    </TBody>
  </Table>
);
