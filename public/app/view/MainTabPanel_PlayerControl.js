Ext.define("vlc_streamer.view.MainTabPanel_PlayerControl", {
    title : 'Player Control',
    requires : [
      'Ext.form.Panel',
      'Ext.flash.Component',
      'Ext.data.JsonStore'
    ],
    
    alias : "widget.MainTabPanel_PlayerControl",
    extend: 'Ext.form.Panel',
    
    layout : 'vbox',
    
    bodyStyle: 'padding:5px 5px 0',    

    items : [
      {
        xtype : 'combobox',
        fieldLabel : 'Channel',
        name : 'channel',
        width : '50%',
        displayField : 'channelName',
        valueField : 'server',
        queryMode : 'local',
        editable: false,
        itemId: 'channel',
        store : {
          type : 'json',
          fields : ['server', 'channelName']                  
        },
        tpl: '<tpl for="."><div class="x-boundlist-item" >{server} - {channelName}</div></tpl>', 
      }/*
      {
      
        xtype: 'flash',
        title : 'Player',             
        itemId : 'flashcomponent',

        flex : 1,        
        width : '100%',

        resizable : false,
        
        url : "/resources/player.swf",
        flashParams : {
          allowFullScreen : true
        },
         
        flashVars :  { 
          stream : "rtmp://192.168.0.35/flvplayback/",
          streamname : "stream",
          skin : "/resources/skin.swf",
          live : 1           
        }
                       
      }*/
    ]    
      
});
