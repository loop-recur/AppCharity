var render = function() {
  var topBanner = nrequire('/templates/views/top_banner'),
      Controller = nrequire('/templates/controllers/about'),
      Detail = nrequire('/templates/views/about_detail'),
      BorderShadows = nrequire('/ui/border_shadows');
  
  var COLORS = ['red', 'blue', 'yellow', 'green', 'orange'];
  
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),
    
    vert_view: UI.createView({
      layout: 'vertical'
    }),
    
    donate_banner: topBanner.render().view,
    
    shadow: BorderShadows({top: 120}).view,
    
    subnav: UI.createView({
      top: 0,
      height: 120,
      width: "100%"
    }),
    
    detail_view: Detail.render()
  };
  
  if(isIPad) self.vert_view.add(self.donate_banner);
  self.vert_view.add(self.subnav);
  self.vert_view.add(self.detail_view.view);
  self.win.add(self.shadow);
  self.win.add(self.vert_view);
  
  
  self.addSubNavItem = function(page, left, idx, width) {
    var nav_item = Ti.UI.createView({
      width: width,
      left: left,
      page: page,
      idx: idx
    });
    
    var title_view = UI.createView({
      backgroundColor: "white",
      bottom:24,
      width: 120,
      height: Ti.UI.SIZE,
      page: page,
      idx: idx
    });
    
    var title_label = UI.createLabel({
      text: page.title,
      top: 5,
      color: "black",
      font: {fontWeight: 'normal'},
      bottom: 5,
      left: 5,
      right: 5,
      width: 120,
      height: Ti.UI.SIZE,
      page: page,
      idx: idx
    });
    
    var scroll = UI.createView({
      height: Ti.UI.FILL,
      width: Ti.UI.FILL,
      page: page,
      idx: idx
    });
    
    var mask = UI.createView({
      backgroundImage: "/images/backgrounds/about_nav_overlay_"+COLORS[idx]+".png",
      opacity: 0.7,
      width: Ti.UI.FILL,
      height: Ti.UI.FILL,
      page: page,
      idx: idx
    });
    
    var img = UI.createImageView({
      image: page.photo.urls.medium_640,
      page: page,
      idx: idx
    });
    
    img.addEventListener('load', function(e) {
      var i = img.image;
      scroll.add(UI.createView({backgroundImage: i}));
      scroll.remove(img);
    });
    
    scroll.add(img);
    nav_item.add(scroll);
    nav_item.add(mask);
    
    title_view.add(title_label);
    title_view.transform = Ti.UI.create2DMatrix().rotate(90);
    
    nav_item.add(title_view);
    
    self.subnav.add(nav_item);
    
    nav_item.mask = mask;
    nav_item.title = title_label;
    nav_item.image = img;
    
    return nav_item;
  };

  Controller(self);

  return self;
};

module.exports = {render: render}
