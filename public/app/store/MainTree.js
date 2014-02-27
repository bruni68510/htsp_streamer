Ext.define('vlc_streamer.store.MainTree', {
  extend: 'Ext.data.TreeStore',
  
  requires : [
    'vlc_streamer.model.MainTree',
    "Ext.data.Store",
    'Ext.data.proxy.Memory'
  ],
  
  model: 'vlc_streamer.model.MainTree',
  
  root: {
    text: 'Menu',
    children: [{
      text: 'RTMP',
      children: [{
        text: 'Control',
        leaf: true,
        id : 'RTMPControl'
      }]      
    }, {
      text : 'HTS',
      
      children: [{
        text: 'Control',
        leaf: true,
        id : 'HTSControl'
      }]

    }, {
      text : 'Player',
      
      children: [{
        text: 'Control',
        leaf: true,
        id : 'PlayerControl'
      }]

    }]
  },
  proxy: {
    type: 'memory',
    reader: {
      type: 'json'
    }
  }
  
});