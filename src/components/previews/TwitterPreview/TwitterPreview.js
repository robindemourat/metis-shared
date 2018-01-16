import React from 'react';
import Tweet from 'react-tweet';

import './TwitterPreview.scss';

const TEXT_LIMIT = 280;

const makeText = (title, link, creators) => {
  const creatorsStr = creators.reduce((str, creator, index) =>
    str
    + (creator.given ? creator.given : '')
    + (creator.given && creator.family ? ' ' : '')
    + (creator.family ? creator.family : '')
    + (index === creators.length - 1 ? '' : ' & ')
    , '');

  const vals = [title, link, creatorsStr];
  let txt = '';
  vals.forEach(val => {
    if (val && (txt + ' ' + val).length <= TEXT_LIMIT) {
      txt += ' ' + val;
    }
  });
  return txt;
};

export default ({
  montage: {
    data: {
      link,
      attached_assets: attachedAssets = []
      // include-abstract
    }
  },
  composition: {
    metadata: {
      title,
      creators
    }
  },
  assets,
  profileImageUri
}) => {
  const {
    abstractImageUri
  } = assets;
  const text = makeText(title, link, creators);
  let registeredMedia = attachedAssets.map(citation => {
    const {image_asset_id: imageAssetId} = citation;
    if (assets[imageAssetId]) {
      const base64 = assets[imageAssetId];
      return {
          id: 'xxx',
          id_str: 'xxxx',
          indices: [240, 280],
          media_url: base64,
          media_url_https: '',
          url: '',
          display_url: '',
          expanded_url: '',
          type: 'photo',
          sizes:
          {
              medium:
              {
                  w: 600,
                  h: 426,
                  resize: 'fit'
              },
              large:
              {
                  w: 1024,
                  h: 727,
                  resize: 'fit'
              },
              thumb:
              {
                  w: 150,
                  h: 150,
                  resize: 'crop'
              },
              small:
              {
                  w: 340,
                  h: 241,
                  resize: 'fit'
              }
          }
      };
    }
  })
  .filter(a => a);
  if (abstractImageUri) {
    registeredMedia = [{
        id: 'xxx',
        id_str: 'xxxx',
        indices: [240, 280],
        media_url: abstractImageUri,
        media_url_https: '',
        url: '',
        display_url: '',
        expanded_url: '',
        type: 'photo',
        sizes:
        {
            medium:
            {
                w: 600,
                h: 426,
                resize: 'fit'
            },
            large:
            {
                w: 1024,
                h: 727,
                resize: 'fit'
            },
            thumb:
            {
                w: 150,
                h: 150,
                resize: 'crop'
            },
            small:
            {
                w: 340,
                h: 241,
                resize: 'fit'
            }
        }
    }, ...registeredMedia];
  }
  const tweetData = {
    // id_str: 'xxxxx',
    user: {
      name: 'Plurishing',
      screen_name: 'plurishing',
      profile_image_url: profileImageUri
    },
    text,
    created_at: new Date().getTime(),
    favorite_count: '0',
    retweet_count: '0',
    entities: {
      media: registeredMedia,
      urls: [],
      user_mentions: [],
      hashtags: [],
      symbols: []
    }
  };
  const linkProps = {target: '_blank', rel: 'noreferrer'};


  return (
    <div className="plurishing-backoffice-TwitterPreview">
      <Tweet
        data={tweetData}
        linkProps={linkProps} />
    </div>
  );
};
