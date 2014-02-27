Ext.define("vlc_streamer.view.HTSStream", {
    title : 'HTS Channel streamer',
    requires : [
      'vlc_streamer.view.HTSChannel',
      'Ext.form.field.TextArea',
      'Ext.panel.Panel'           
    ],
    
    alias : "widget.HTSStream",
    extend: 'Ext.panel.Panel',
    
    layout : 'hbox',
            
    bodyStyle: 'padding:5px 5px 5px',    

    items : [{
      xtype : 'HTSChannel',
      flex : 1
    },{
    
      xype : 'panel',
      layout : 'fit',
      title : 'Log',
      flex : 1,      
      height : '100%',
      items : {          
        xtype : 'textarea',
        name : 'log',            
        style: 'padding:10px 10px 0',
        hideLabel : true,
        enabled : false,
        readOnly : true,
        fieldStyle: {
          'fontFamily'   : 'courier new',
          'fontSize'     : '10px'
        }
      }
    }]      
});
