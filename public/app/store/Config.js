Ext.define('vlc_streamer.store.Config', {
  extend: 'Ext.data.Store',
  
  requires : [
    "Ext.data.Store"
  ],
  
  model: 'vlc_streamer.model.Config',
  
  autoLoad : true,  

  proxy: {
    type: 'ajax',
    url : '/config',
    restful : true,
    reader: {
      type: 'json'
    }
  }
  
});