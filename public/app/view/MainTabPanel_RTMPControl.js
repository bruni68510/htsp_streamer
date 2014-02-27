Ext.define("vlc_streamer.view.MainTabPanel_RTMPControl", {
    title : 'RTMP Control',

    requires : [
      'Ext.panel.Panel',
      'Ext.layout.container.Accordion',
      'vlc_streamer.view.RTMPConnect',
      'vlc_streamer.view.RTMPInstallRun'
    ],
    
    alias : "widget.MainTabPanel_RTMPControl",
    extend: 'Ext.panel.Panel',
    
    defaults: {
        // applied to each contained panel
        bodyStyle: 'padding:15px'
    },
    layout: {      
        type: 'accordion',
        titleCollapse: false,
        animate: true
        //activeOnTop: true
    },
     
    items : [{
        xtype : 'RTMPConnect'
    }],
    
    buttons : [{
      text : 'connect',
      action : 'connect',
      disabled : true
    }, {
      text : 'disconnect',
      action : 'disconnect',
      disabled : true
    }]
      
});
