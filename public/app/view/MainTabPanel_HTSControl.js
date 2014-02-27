Ext.define("vlc_streamer.view.MainTabPanel_HTSControl", {
    title : 'HTS Control',

    requires : [
      'Ext.panel.Panel',
      'Ext.layout.container.Accordion',
      'vlc_streamer.view.HTSConnect',
      'vlc_streamer.view.HTSStream'
    ],
    
    alias : "widget.MainTabPanel_HTSControl",
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
        xtype : 'HTSConnect'
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
