Ext.define('vlc_streamer.model.MainTree', {
    extend: 'Ext.data.Model',
    
    fields: [
      {name: 'text', type: 'string'},
      {name: 'leaf', type: 'bool'},
      {name: 'expanded', type: 'bool'},
      {name: 'id', type: 'string'}
    ],
    hasMany: {model: 'vlc_streamer.model.MainTree', name: 'children'}
});