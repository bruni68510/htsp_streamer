Ext.define('vlc_streamer.controller.RTMPConnect', {
    extend: 'Ext.app.Controller',
             
    views : [
      'RTMPConnect',
      'RTMPInstallRun'
    ],  
   
    refs : [{
      selector : 'RTMPConnect',
      ref : 'RTMPConnectForm'  
    }, {
      selector : 'RTMPInstallRun',
      ref : 'RTMPInstallRunForm'
    },{
      selector : 'MainTabPanel_RTMPControl button[action=connect]',
      ref : 'ConnectButton'
    }, {
      selector : 'MainTabPanel_RTMPControl button[action=disconnect]',
      ref : 'DisconnectButton'
    }, {
      selector : 'viewport MainTabPanel MainTabPanel_RTMPControl',
      ref : 'RTMPControlAccordion'
    }, {
      selector : 'RTMPConnect textfield[name=host]',
      ref : 'HostField'
    },{
      selector : 'RTMPConnect textfield[name=password]',
      ref : 'PasswordField'
    }],  

    init : function() {
      this.control({
        'MainTabPanel_RTMPControl button[action=connect]' : {
          click : function(button) {
          
            this.getRTMPConnectForm().submit({
              clientValidation : true,
              url : "/rtmp/connect",
              scope : this,
              success : function(form, action) {
                form.getFields().each(function(it) {
                  it.setDisabled(true);
                });
                
                this.getConnectButton().setDisabled(true);
                this.getDisconnectButton().setDisabled(false);
                
                vlc_streamer.app.rtmp.id = action.result.id;
                vlc_streamer.app.rtmp.local_port = action.result.local_port;
                vlc_streamer.app.rtmp.server = this.getHostField().getValue(); 
                var accordion = this.getRTMPControlAccordion().add({ xtype : 'RTMPInstallRun' });
                
                accordion.expand();
                
              }
            });
            
          }
        },
        
        'MainTabPanel_RTMPControl button[action=disconnect]' : {        
          click : function(button) {
            
            var form = this.getRTMPConnectForm();
            var install_form = this.getRTMPInstallRunForm();
          
            Ext.Ajax.request({
               url: '/rtmp/disconnect/' + vlc_streamer.app.rtmp.id ,
               method : 'post',
               scope : this,
               success : function() {
                 form.getForm().getFields().each(function (it) {
                   it.setDisabled(false);
                 });
                 
                this.getConnectButton().setDisabled(false);
                this.getDisconnectButton().setDisabled(true);
                
                form.expand();
                
                this.getRTMPControlAccordion().remove(install_form);
               }
            });
          }
        },
        
        'RTMPConnect' : {
          fieldvaliditychange : function(panel,field,isValid) {
            
            var valid = true;
            panel.getForm().getFields().each(function(it) {
              if (it.isValid) {
                if (!it.isValid()) {
                  valid = false;
                }
              }
            });
            
            this.getConnectButton().setDisabled(!valid);            

          }
        },
        
        'RTMPConnect checkbox[name=use_key]' : {
        
          change: function( field, newvalue, oldvalue)  
          {
            if (newvalue == true) {
              this.getPasswordField().setFieldLabel("passphase");
            }
            else {
            this.getPasswordField().setFieldLabel("password");
            }
          }
        
        }
      })
    }
   
});
