

export default {
  id: 'audio',
  accepts: ['audio'],
  assetPickingRules: {
    track: {
      'web': ['audio_track_asset_id'],
      'micro': [],
      'epub-fixed': ['audio_track_asset_id'],
      'pdf': [],
      'epub-reflowable': []
    },
    transcription: {
      'web': ['transcription_asset_id'],
      'micro': ['transcription_asset_id'],
      'epub-fixed': ['transcription_asset_id'],
      'pdf': ['transcription_asset_id'],
      'epub-reflowable': ['transcription_asset_id']
    }
  }
};
