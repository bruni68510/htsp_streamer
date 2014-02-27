Ext.define("vlc_streamer.view.HTSChannel", {
  extend : 'Ext.grid.Panel',
  
  title : 'HTSChannels',  

  alias : 'widget.HTSChannel',
  
  requires : [
      'Ext.grid.Panel',
      'Ext.grid.column.Action',
      'vlc_streamer.store.HTSChannel'
  ],
  
  store : "vlc_streamer.store.HTSChannel",
  
  columns : [
    { text : 'ChannelName', dataIndex : 'channelName', width : 250 },
    { text : 'ChannelNumber', dataIndex : 'channelNumber', width : 150 },
    {
      xtype:'actioncolumn', 
      width:80,
      text : 'Transcoder',
      items: [{
        icon: '/resources/ffmpeg.png',  // Use a URL in the icon config
        tooltip: 'Start',
        itemId : 'start_icon',
        isDisabled : function(view, rowIndex, colIndex, item, record) {
          return !record.get('is_startable');                  
        }
      },{
        icon: '/resources/stop_red_icon.png',  // Use a URL in the icon config
        itemId : 'stop_icon',
        tooltip: 'Stop',
        isDisabled : function(view, rowIndex, colIndex, item, record) {        
          return !record.get('is_started');               
        }
      }]
    }
  ],
  
  initComponent : function() {
    this.callParent();
 
    this.addEvents("addChannel","removeChannel");
  
  }


});
  
  
  
  
  
  
