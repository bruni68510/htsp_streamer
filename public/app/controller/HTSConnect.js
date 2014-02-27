Ext.define('vlc_streamer.controller.HTSConnect', {
    extend: 'Ext.app.Controller',
             
    views : [
      'HTSConnect',
      'HTSChannel'
    ],  
   
    refs : [{
      selector : 'HTSConnect',
      ref : 'HTSConnectForm'  
    }, {
      selector : 'HTSChannel',
      ref : 'HTSChannelForm'
    },{
      selector : 'HTSStream',
      ref : 'HTSStreamForm'
    }, {
      selector : 'MainTabPanel_HTSControl button[action=connect]',
      ref : 'ConnectButton'
    }, {
      selector : 'MainTabPanel_HTSControl button[action=disconnect]',
      ref : 'DisconnectButton'
    }, {
      selector : 'viewport MainTabPanel MainTabPanel_HTSControl',
      ref : 'HTSControlAccordion'
    }],  

    init : function() {
      this.control({
        'MainTabPanel_HTSControl button[action=connect]' : {
          click : function(button) {
          
            this.getHTSConnectForm().submit({
              clientValidation : true,
              url : "/hts/connect",
              scope : this,
              success : function(form, action) {
                form.getFields().each(function(it) {
                  it.setDisabled(true);
                });
                
                this.getConnectButton().setDisabled(true);
                this.getDisconnectButton().setDisabled(false);
                
                vlc_streamer.app.hts.id = action.result.id;
                                
                var accordion = this.getHTSControlAccordion().add({ xtype : 'HTSStream' });
                
                accordion.expand();
                
              }
            });
            
          }
        },
        
        'MainTabPanel_HTSControl button[action=disconnect]' : {        
          click : function(button) {
            
            var form = this.getHTSConnectForm();
            var stream_form = this.getHTSStreamForm();
          
            Ext.Ajax.request({
               url: 'hts/disconnect/' + vlc_streamer.app.hts.id,
               method : 'post',
               scope : this,
               success : function() {
                 form.getForm().getFields().each(function (it) {
                   it.setDisabled(false);
                 });
                 
                 this.getConnectButton().setDisabled(false);
                 this.getDisconnectButton().setDisabled(true);
                 form.expand();
                 this.getHTSControlAccordion().remove(stream_form);
               }
            });
          }
        },
        
        
        'HTSConnect' : {
          fieldvaliditychange : function(panel,field,isValid) {
            
            var valid = true;
            panel.getForm().getFields().each(function(it) {
              if (!it.isValid()) {
                valid = false;
              }
            });
            
            this.getConnectButton().setDisabled(!valid);            

          }
        }
      })
    }
   
});