module.exports = function(detail_props, master_props) { 
  detail_props = detail_props || {};
  master_props = master_props || {};
  
  var win = UI.createWindow(_.extend({
        barColor : 'black'
      }, detail_props)),
    
      win2 = UI.createWindow(_.extend({
        barColor : 'black',
        title : 'Menu'
      }, master_props)),
 
      nav = Ti.UI.iPhone.createNavigationGroup({
        window : win
      }),
    
      nav2 = Ti.UI.iPhone.createNavigationGroup({
        window : win2
      }),
 
      splitwin = Ti.UI.iPad.createSplitWindow({
        detailView : nav,
        masterView : nav2
      });
 
  splitwin.addEventListener('visible', function(e) {
      if(e.view == 'detail') {
          e.button.title = "Menu";
          win.leftNavButton = e.button;
      } else if(e.view == 'master') {
          win.leftNavButton = null;
      }
  });
 
  return splitwin;
};
