Ext.define('vlc_streamer.Application', {
    name: 'vlc_streamer',

    extend: 'Ext.app.Application',    

    
    requires : [
      'Ext.state.CookieProvider',
      'Ext.state.Manager'
    ],
    

    hts : {
      id : null,
      stream : null
    },
    
    rtmp : {
      id : null,
      server : null,
      local_port : null,
      is_started : false
    },
    
    views: [
        // TODO: add views here
        'vlc_streamer.view.MainTree',
        'vlc_streamer.view.MainTabPanel',
        'vlc_streamer.view.MainTabPanel_HTSControl',
        'vlc_streamer.view.MainTabPanel_RTMPControl',
        'vlc_streamer.view.MainTabPanel_PlayerControl',
    ],

    controllers: [
        // TODO: add controllers here        
        'vlc_streamer.controller.MainTree',
        'vlc_streamer.controller.HTSConnect',
        'vlc_streamer.controller.HTSChannel',
        'vlc_streamer.controller.RTMPConnect',
        'vlc_streamer.controller.RTMPInstallRun',
        'vlc_streamer.controller.MainTabPanel_PlayerControl'
    ],

    stores: [
        // TODO: add stores here
        'vlc_streamer.store.MainTree',
        'vlc_streamer.store.Config',
        'vlc_streamer.store.HTSChannel'
    ],
    
    models: [
      'vlc_streamer.model.MainTree',
      'vlc_streamer.model.Config',
      'vlc_streamer.model.HTSChannel'
    ],
    
    
    launch : function() {
    
      // define global handler for ajax requests
      Ext.Ajax.on('requestexception', function (conn, response, options) {
        if (response.status === 400) {
          var json = Ext.decode(response.responseText);
          Ext.Msg.alert('Failure', json.message);
        }
        else if (response.status === 0) {
          Ext.Msg.alert('Failure', 'Ajax communication failed');
        }
        else if (response.status != 200) {
        
          Ext.Msg.alert('Failure', response.statusText);        
        } 
        
      });
     
     
      var cp = new Ext.state.CookieProvider({        
        expires: new Date(new Date().getTime()+(1000*60*60*24*30)), //30 days         
      });
      
      Ext.state.Manager.setProvider(cp);
     
      //this.mask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});      
    }
});
