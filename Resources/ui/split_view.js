SplitView = function(title) { 
    var win = UI.createWindow({
        barColor : 'black',
        title : title
    });
    
    var win2 = UI.createWindow({
        barColor : 'black',
        title : 'Menu'
    });
 
    var nav = Ti.UI.iPhone.createNavigationGroup({
        window : win
    });
    
    var nav2 = Ti.UI.iPhone.createNavigationGroup({
        window : win2
    });
 
    var splitwin = Ti.UI.iPad.createSplitWindow({
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
