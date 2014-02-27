Ext.define('vlc_streamer.controller.MainTree', {
    extend: 'Ext.app.Controller',
     
        
    refs : [{
      selector : 'viewport #main_tree',
      ref : 'mainTree'
    }, {
      selector : 'viewport #main_tabpanel',
      ref : 'mainTabPanel'
    }],
   
    onLaunch : function() {

      this.getMainTree().on({
        'itemdblclick' : {
          fn : function(panel, record, item, index, e) {
            
            if(record.get("leaf")) {
              var id = record.get("id");
              
              var child =  this.getMainTabPanel().child('#MainTabPanel_' + id);
              
              if (child == null) {
                child = this.getMainTabPanel().add({ xtype : 'MainTabPanel_' + id, itemId : 'MainTabPanel_' + id });
              }
              
              this.getMainTabPanel().setActiveTab(child);
                  
            }
           }, scope : this
         }
      });
    }   
   
});