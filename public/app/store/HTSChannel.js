Ext.define('vlc_streamer.store.HTSChannel', {
  extend: 'Ext.data.Store',
  
  requires : [
    "Ext.data.Store"
  ],
  
  model: 'vlc_streamer.model.HTSChannel',
  
  autoLoad : false,  

  sorters : [{
        property: 'channelNumber',
        direction: 'ASC'
   }],


  proxy: {
    type: 'ajax',
    //url : '/hts/channels/' + vlc_streamer.app.hts_id,
    restful : true,
    reader: {
      type: 'json',
      root : 'data'
    }
  }
  
});
