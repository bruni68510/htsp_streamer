Ext.define('vlc_streamer.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    
    items: [
    {
        region : 'north',
        border : true,
        height : 70,
        html : '<center><h1>Welcome to VLC Streamer</h1></center>'
    },
    {
        region: 'west',
        border : true,
        xtype : 'MainTree',
        width: 200
    },{
        border : true,
        region: 'center',
        xtype: 'MainTabPanel'
    }]
});