Windows.About = function() {
  var colors = ['red', 'green', 'yellow', 'blue', 'white']
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),
    
    shadow: UI.BorderShadows().view,
    
    subnav: UI.createView({
      top: 0,
      height: 120,
      width: "100%"
    }),
    
    detail_view_proxy: Views.AboutDetail()
  };

  self.win.add(self.shadow);
  self.win.add(self.detail_view_proxy.view);
  self.win.add(self.subnav);
  
  self.addSubNavItem = function(page, left, idx, width) {
    var nav_item = UI.createView({
      width: width,
      left: left
    });
    
    var title_view = UI.createView({
      backgroundColor: "white",
      bottom:30,
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE
    });
    
    var title_label = UI.createLabel({
      text: page.title,
      top: 5,
      bottom: 5,
      left: 5,
      right: 5,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    });
    
    var scroll = UI.createScrollView({
      showHorizontalScrollIndicator:false,
      showVerticalScrollIndicator:false
    });
    
    var mask = UI.createView({
      backgroundColor: colors[idx],
      opacity: 0.3,
      width: Ti.UI.FILL,
      height: Ti.UI.FILL
    });
    
    var img = UI.createImageView({
      image: page.photo.urls.medium_640
    });
    
    scroll.add(img);
    nav_item.add(scroll);
    nav_item.add(mask);
    
    title_view.add(title_label);
    title_view.transform = Ti.UI.create2DMatrix().rotate(90);
    
    nav_item.add(title_view);
    
    self.subnav.add(nav_item);
    
    return nav_item;
  };

  Controllers.About(self);

  return self;
};
