Ext.define("vlc_streamer.view.MainTree", {
    title : 'Navigation',
    requires : [
      'Ext.tree.Panel', 
      'vlc_streamer.store.MainTree'
    ],
    itemId : "main_tree",
    alias : "widget.MainTree",
    extend: 'Ext.tree.Panel',
    store : "vlc_streamer.store.MainTree"
});