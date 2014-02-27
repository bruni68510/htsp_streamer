Ext.define('vlc_streamer.controller.MainTabPanel_PlayerControl', {
    extend: 'Ext.app.Controller',
             
    views : [
      'MainTabPanel_PlayerControl'
    ],  
    
    refs : [{
      selector : 'MainTabPanel_PlayerControl',
      ref : 'PlayerControlForm'  
    }, {
      selector : 'HTSChannel',
      ref : 'HTSChannelForm'
    }, {
      selector : 'MainTabPanel_PlayerControl combobox[name=channel]',
      ref : 'ChannelCombobox'
    }, {
      selector : 'MainTabPanel_PlayerControl flash',
      ref : 'FlashPlayer'    
    }],
    
    init : function() {
    
      this.control({
      
        'HTSChannel' : {
                 
          'addChannel' : function(form, value) {
            if(this.getChannelCombobox()) {
              this.getChannelCombobox().getStore().add(value);
            }
          },
          
          'removeChannel' : function(form, value) {
          
             var combo = this.getChannelCombobox(); 
          
             if(combo) {
              //this.getChannelCombobox().getStore().remove(value);
              var r = null;
              this.getChannelCombobox().getStore().each(function(record) {
                if (record.get("server") == value.server && record.get("channelName") == value.channelName) {
                  r = record;
                }
              });
                            
              if (r) {
                combo.getStore().remove(r);
                combo.setValue("");
              }
              
              if (this.getFlashPlayer()) {
                this.getPlayerControlForm().remove(this.getFlashPlayer(), true);
              }
            }         
          },
          
       },
       
       'MainTabPanel_PlayerControl' : {
          'added' : function(form) {
          
            if (vlc_streamer.app.hts.is_started) {
               this.getChannelCombobox().getStore().add({ server : vlc_streamer.app.rtmp.server, channelName : vlc_streamer.app.hts.channelName });
            }
          
          }
       },
       
       'MainTabPanel_PlayerControl combobox[name=channel]' : {
        
        
          'select' : function(combo,records) {
            
              if (this.getFlashPlayer()) {
                this.getPlayerControlForm().items.remove(this.getFlashPlayer());
              }
               
              
              this.getPlayerControlForm().add({
              
                xtype: 'flash',
                title : 'Player',             
                itemId : 'flashcomponent',
  
                flex : 1,        
                width : '100%',
  
                resizable : false,
        
                url : "/resources/player.swf",
                flashParams : {
                  allowFullScreen : true
                },
         
                flashVars :  { 
                  stream : "rtmp://" + records[0].get("server") + "/flvplayback/",
                  streamname : "stream",
                  skin : "/resources/skin.swf",
                  live : 1,
                  autoplay : 1           
                }
                
             });
                    
          }
        
        } 
              
      });
    
    }  
});    