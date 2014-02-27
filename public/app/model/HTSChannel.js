Ext.define('vlc_streamer.model.HTSChannel', {
    extend: 'Ext.data.Model',
    
    fields: [
      {name: 'channelId', type: 'int'},
      {name: 'channelNumber', type: 'int'},
      {name: 'channelName', type: 'string'},
      {name: 'is_startable', type: 'boolean'},
      {name: 'is_started', type: 'boolean'}
    ]
});
