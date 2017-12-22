import React from 'react';

import { storiesOf } from '@storybook/react';
import TranslationsProvider from './TranslationProvider';

import lib from '../src';

const {
  components: {
      previews: {
        DynamicMontagePreview,
        StaticMontagePreview,
        FacebookPreview,
        TwitterPreview,
        MailingPreview,
      }
  }
} = lib;

storiesOf('Mailing preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <MailingPreview
          montage={{
            data: {
              include_abstract: true,
              montage_url: 'http://www.example.com'
            },
          }}
          composition={{
              metadata: {
                title: 'My composition',
                abstract_original: 'This is an abstract'
              }
            }}
        />
      </TranslationsProvider>
    )
  })

storiesOf('Facebook preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <FacebookPreview
          montage={{
            data: {
              include_abstract: true,
              montage_url: 'http://www.example.com'
            },
          }}
          composition={{
              metadata: {
                title: 'My composition',
                abstract_original: 'This is an abstract'
              }
            }}
          profileImageUri='profile-image.jpg'
        />
      </TranslationsProvider>
    )
  })

storiesOf('Twitter preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <TwitterPreview
          montage={{
            data: {
              link: 'http://www.example.com',
              // include-abstract
            }
          }}
          composition={{
            metadata: {
              title: 'My composition',
              creators: [{given: 'Charles', family: 'Dupond'}]
            }
          }}
          assets={{
            abstractImageUri: 'abstract-example.jpeg'
          }}
          profileImageUri='profile-image.jpg'
        />
      </TranslationsProvider>
    )
  })


import dynamicMock from './dynamic-mock.json';
storiesOf('Dynamic preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <DynamicMontagePreview
          montage={dynamicMock.montage}
          compositions={dynamicMock.compositions}
          resources={dynamicMock.resources}
          assets={dynamicMock.assets}
        />
      </TranslationsProvider>
    )
  })

import staticMock from './static-mock.json';
storiesOf('Static preview', module)
  .add('default', () => {
    return (
      <TranslationsProvider>
        <StaticMontagePreview
          montage={staticMock.montage}
          compositions={staticMock.compositions}
          resources={staticMock.resources}
          assets={staticMock.assets}
        />
      </TranslationsProvider>
    )
  })