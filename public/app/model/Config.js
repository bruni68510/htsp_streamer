Ext.define('vlc_streamer.model.Config', {
    extend: 'Ext.data.Model',
    
    fields: [
      {name: 'hts_server', type: 'string'},
      {name: 'hts_user', type: 'string'}
    ]
});