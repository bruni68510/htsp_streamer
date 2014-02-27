Ext.define('vlc_streamer.controller.RTMPInstallRun', {
    extend: 'Ext.app.Controller',
             
    requires : [ 
      'Ext.LoadMask',
      'Ext.ux.EventSource'
    ],             
             
    views : [
      'RTMPConnect',
      'RTMPInstallRun'
    ],  
   
    refs : [{
      selector : 'RTMPInstallRun',
      ref : 'RTMPInstallRunForm'
    },{
      selector : 'RTMPInstallRun button[action=install]',
      ref : 'InstallButton'
    }, {
      selector : 'RTMPInstallRun button[action=run]',
      ref : 'RunButton'
    },
    {
      selector : 'RTMPInstallRun textarea',
      ref : 'LogTextArea'
    },
    {
      selector : 'RTMPInstallRun button[action=stop]',
      ref : 'StopButton'
    },{
      selector : 'RTMPInstallRun combobox[name=version]',
      ref : 'VersionCombobox'
    },{
      selector : 'viewport MainTabPanel MainTabPanel_RTMPControl',
      ref : 'RTMPControlAccordion'
    }],  

    init : function() {
      this.control({
        'RTMPInstallRun button[action=install]' : {
          click : function(button) {
          
            this.getRTMPInstallRunForm().setLoading(true,true);
                     
            Ext.Ajax.request({            
              url : '/rtmp/install/' + vlc_streamer.app.rtmp.id,              
              scope : this,
              method : 'POST',
              params : {
                version : this.getVersionCombobox().getValue()
              },
              failure : function(response) {
                this.getRTMPInstallRunForm().setLoading(false);
              },              
              success : function(response) {
              
                this.getRTMPInstallRunForm().setLoading(false);
              
                var json = Ext.decode(response.responseText);   
                
                this.getInstallButton().setDisabled(true);
                
                Ext.Msg.show({ title : "Installation successfull", msg: Ext.util.Format.nl2br(json.message) });
                
              }         
            });
          }
        },
        
        'RTMPInstallRun button[action=run]' : {        
          click : function(button) {          
      
            var controller = this;                    
            var textarea = controller.getLogTextArea();
                        
            button.up('form').eventsource = Ext.create ('Ext.ux.EventSource', {
              url: '/rtmp/run/' +  vlc_streamer.app.rtmp.id,
              listeners: {
                  open: function (es) {
                    textarea.setValue("");
                    vlc_streamer.app.rtmp.is_started = true;
                    controller.getRTMPInstallRunForm().fireEvent("rtmprun", controller.getRTMPInstallRunForm());
                    controller.getRunButton().disable();
                    controller.getStopButton().enable();
                  } ,
                  close: function (es) {
                    textarea.setValue("");
                    vlc_streamer.app.rtmp.is_started = false;
                    controller.getRTMPInstallRunForm().fireEvent("rtmpstop", controller.getRTMPInstallRunForm());
                    controller.getRunButton().enable();
                    controller.getStopButton().disable();                                                              
                  },
                  error: function (es, error) {
                    vlc_streamer.app.rtmp.is_started = false;  
                    textarea.setValue("");
                  } ,
                  message: function (es, message) {            
                    textarea.setValue(textarea.getValue() + message); 
                  }
              }
          });
            
          }
        },
        
        'RTMPInstallRun button[action=stop]' : {        
          click : function(button) {            
            button.up("form").eventsource.close();
            button.up("form").eventsource = null;
          }
        },
        
        'RTMPInstallRun' : {
          added : function(form) {          
            Ext.Ajax.request({            
              url : '/rtmp/status/' + vlc_streamer.app.rtmp.id,              
              scope : this,
              success : function(response) {
                var json = Ext.decode(response.responseText);   
                
                this.getInstallButton().setDisabled(json.data.installed);
                this.getRunButton().setDisabled(json.data.running);
                this.getStopButton().setDisabled(json.data.running == false);
              }         
            });          
          },
          
          removed : function(form) {
            if (form.eventsource) {
              form.eventsource.close();
            }
          }
        }
      })
    }
   
});
