Ext.define('vlc_streamer.controller.HTSChannel', {
    extend: 'Ext.app.Controller',
             
    requires : [ 
      'Ext.ux.EventSource'
    ],             
             
    views : [
      'HTSChannel',
      'RTMPInstallRun'
    ],  
   
    refs : [{
      selector : 'RTMPInstallRun',
      ref : 'RTMPInstallRunForm'
    }, {
      selector : 'HTSChannel',
      ref : 'HTSChannelForm'
    },{
      selector : 'HTSStream textarea',
      ref : 'LogTextArea'
    }],  

    reset_records : function(store) {    
      store.each(function(record) {
        record.set("is_startable", vlc_streamer.app.rtmp.is_started);
        record.set("is_started", false);
        record.commit();
      });
    },

    init : function() {
      this.control({
        'RTMPInstallRun' : {
          rtmprun : function(form) {
            var form = this.getHTSChannelForm();
            if (form) {            
              this.reset_records(form.getStore());               
            }  
          },
          rtmpstop : function(form) {
            var form = this.getHTSChannelForm();
            if (form) {
              this.reset_records(form.getStore());                          
            }
          }
        },
        'HTSChannel' : {
          beforeadd : function(form) {
            form.getStore().load({ 
              url : '/hts/channels/' + vlc_streamer.app.hts.id,
              scope : this,
              callback : function(records, operation, success) {
                if (success) {
                  this.reset_records(form.getStore());
                }
              }
            });
          },
          removed : function(form) {
            if (form.eventsource) {
              form.eventsource.close();
            }
          }
        },
        'HTSChannel actioncolumn' : {
          click : function(view,cell,row,col,e, record) {
                        
            var controller = this;
                                    
            if (Ext.get(e.getTarget()).el.hasCls("x-action-col-0")) 
            {
              // first icon
              if (record.get("is_startable")) {
              
                var textarea = this.getLogTextArea();
                var form = this.getHTSChannelForm();
                              
                 form.eventsource = Ext.create ('Ext.ux.EventSource', {
                    url: '/hts/transcode/' +  vlc_streamer.app.hts.id + '/' + record.get("channelId") + "/" + vlc_streamer.app.rtmp.local_port,                    
                    listeners: {
                        open: function (es) {
                          textarea.setValue("");
                          vlc_streamer.app.hts.is_started = true; 
                          vlc_streamer.app.hts.channelName = record.get("channelName");     
                          
                          record.store.each(function(a_record) {                          
                            a_record.set("is_startable", "false");
                            a_record.set("is_started", "false");
                            a_record.commit();
                          });            
                          
                          form.fireEvent("addChannel", form,  { server : vlc_streamer.app.rtmp.server, channelName : record.get("channelName") });                          
                          record.set("is_started", true);
                          record.commit();                          
                                  
                        } ,
                        close: function (es) {
                          textarea.setValue("");                          
                          controller.reset_records(record.store);                          
                          vlc_streamer.app.hts.is_started = false;
                          vlc_streamer.app.hts.channelName = "";
                          form.fireEvent("removeChannel", form,  { server : vlc_streamer.app.rtmp.server, channelName : record.get("channelName") });
                        },
                        error: function (es, error) {
                          console.log("error");
                          
                          vlc_streamer.app.hts.is_started = false;  
                          textarea.setValue("");
                          vlc_streamer.app.hts.channelName = "";
                          controller.reset_records(record.store);
                          form.eventsource.close();
                          form.fireEvent("removeChannel", form,  { server : vlc_streamer.app.rtmp.server, channelName : record.get("channelName") });
                        } ,
                        message: function (es, message) {            
                          textarea.setValue(textarea.getValue() + message + "\n"); 
                        }
                    }
                 });
              }
            }
            else {
              // second icon
              
              if (record.get("is_started")) {
                var form = this.getHTSChannelForm();                
                form.eventsource.close();
              }
            }
            
            
          }
        }
      });
    }
   
});
