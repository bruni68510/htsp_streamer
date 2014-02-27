Ext.define("vlc_streamer.view.RTMPConnect", {
    title : 'RMTP Connect',
    requires : [
      'Ext.form.Panel',
      'Ext.layout.container.Column',
      'Ext.form.FieldSet'
    ],
    
    alias : "widget.RTMPConnect",
    extend: 'Ext.form.Panel',
    
    layout : 'column',
    
    bodyStyle: 'padding:5px 5px 0',    

    items : [{
    
        xtype : 'fieldset',
        title : 'RTMP over SSH Connection',
        columnWidth : 0.5, 
            
        items : [{
          fieldLabel : 'host',
          name : 'host',
          xtype : 'textfield',
          stateId : 'rtmp_host',
          stateful : true,
          allowBlank : false
        }, {
          fieldLabel : 'username',      
          name : 'username',
          stateId : 'rtmp_username',
          stateful : true,
          xtype : 'textfield', 
          allowBlank : false
        },        
        {
          fieldLabel : 'password',
          inputType: 'password',
          name : 'password',
          xtype : 'textfield'
        },
        {
          xtype : 'textfield',
          fieldLabel : 'port',
          name : 'port',
          value : '22',
          stateful: true,
          stateId : 'rtmp_ssh_port',
          maskRe: /[0-9.]/
        },
        {
            xtype : 'checkbox',
            fieldLabel : 'use key',
            name : 'use_key',
            stateful : true,
            stateId : 'rtmp_use_key'
        }, {
            xtype : 'textarea',
            fieldLabel : 'RSA key',
            name : 'key',
            anchor : "100%"
        }]      
    }]    
      
});
