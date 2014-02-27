Ext.define("vlc_streamer.view.HTSConnect", {
    title : 'HTS Connect',
    requires : [
      'Ext.form.Panel',
      'Ext.layout.container.Column',
      'Ext.form.FieldSet'
    ],
    
    alias : "widget.HTSConnect",
    extend: 'Ext.form.Panel',
    
    layout : 'column',
    
    bodyStyle: 'padding:5px 5px 0',    

    items : [{
    
        xtype : 'fieldset',
        title : 'HTS Connection',
        columnWidth : 0.4, 
            
        items : [{
            fieldLabel : 'server',
            name : 'server',
            xtype : 'textfield',
            stateful : true,
            stateId : 'hts_server',
            allowBlank : false
          }, {
            fieldLabel : 'port',
            name : 'port',
            value : 9982,
            stateful : true,
            stateId : 'hts_port',
            xtype : 'textfield',
            allowBlank : false 
          }, {
            fieldLabel : 'username',      
            name : 'username',
            xtype : 'textfield',
            allowBlank : false,
            stateful : true,
            stateId : 'hts_username',
          }, {
            fieldLabel : 'password',
            inputType: 'password',
            name : 'password',
            xtype : 'textfield',
            allowBlank : false
          }
       ]
        
    }, {
      columnWidth : 0.1,
      html : "<br />"
    }, {
      xtype : 'fieldset',
      title : 'Transcore settings',
      columnWidth : 0.4, 
            
        items : [{
            fieldLabel : 'ffmpeg path',
            name : 'ffmpeg_path',
            xtype : 'textfield',
            stateful : true,
            stateId : 'hts_ffmpeg_path',
            value : '/usr/bin/ffmpeg',
            allowBlank : false
          }, {
            fieldLabel : 'videocodec',
            name : 'video_codec',
            value : 'libx264',
            stateful : true,
            stateId : 'hts_videocodec',     
            xtype : 'textfield',
            allowBlank : false 
          }, {
            fieldLabel : 'videobitrate',      
            name : 'video_bitrate',
            value : '512',
            xtype : 'textfield',
            allowBlank : false,
            stateful : true,
            stateId : 'hts_videobitrate',
          },{
            fieldLabel : 'audiocodec',
            name : 'audio_codec',
            value : 'aac',
            stateful : true,
            stateId : 'hts_audiocodec',     
            xtype : 'textfield',
            allowBlank : false 
          }, {
            fieldLabel : 'audio_bitrate',      
            name : 'audio_bitrate',
            value : '48',
            xtype : 'textfield',
            allowBlank : false,
            stateful : true,
            stateId : 'hts_audiobitrate'
          }
       ]
    
    
    }]    
      
});