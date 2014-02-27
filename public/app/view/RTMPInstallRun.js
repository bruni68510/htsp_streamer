Ext.define("vlc_streamer.view.RTMPInstallRun", {
    title : 'RMTP Install and Run',
    requires : [
      'Ext.form.Panel',
      'Ext.layout.container.Column',
      'Ext.layout.container.Form',
      'Ext.form.Label',
      'Ext.form.field.ComboBox',
      
    ],
    
    alias : "widget.RTMPInstallRun",
    extend: 'Ext.form.Panel',
    
    layout : 'vbox',
            
    bodyStyle: 'padding:5px 5px 0',    

    items : [{
    
      layout : 'hbox',
      
      items : [{              
        xtype : 'label',
        text : 'RTMP Installer',
        width : 100, 
      },{
      
        xtype : 'combobox',
        width : 200,
        hideLabel : true,
        name : 'version',
        value : 'x86_64-Ubuntu_12.04',
        editable : false,
        store : [
          'x86_64-Ubuntu_12.04',
          'x86_64-Ubuntu_11.10',
          'x86_64-MacOSX_10.8',
          'x86_64-FreeBSD_9.1',
          'x86_64-FreeBSD_9.0',
          'x86_64-Fedora_17',
          'x86_64-Debian_6.0.5',
          'x86_64-CentOS_6.2',
          'i686-Ubuntu_12.04',
          'i686-Ubuntu_11.10',
          'i686-FreeBSD_9.1',
          'i686-FreeBSD_9.0',
          'i686-Fedora_17',
          'i686-Debian_6.0.5',
          'i686-CentOS_6.2',
        ]
      
      },{        
         width : 100,        
         xtype : 'button',
         text : 'Install',
         disabled : true,
         autoWidth : true,
         action : 'install'
      }]
    
    },{
    
      layout : 'hbox',     
      items : [{              
        xtype : 'label',
        text : 'RTMP daemon',
        width : 100 
      },{          
         xtype : 'button',
         text : 'Run',
         disabled : true,
         autoWidth : true,
         action : 'run',
         width : 100
      },{
         xtype : 'button',
         text : 'Stop',
         disabled : true,
         autoWidth : true,
         action : 'stop',
         width : 100
      }]    
    },{    
      xtype : 'label',
      text : 'Log'
    },{
        
      xtype : 'textarea',
      name : 'log',
      flex : 1,
      width : '100%',
      hideLabel : true,
      enabled : false,
      readOnly : true,
      fieldStyle: {
        'fontFamily'   : 'courier new',
        'fontSize'     : '10px'
      }
    }],
    
    initComponent : function() {
      this.addEvents('rtmprun','rtmpstop');
      this.callParent();
    
    }      
});
