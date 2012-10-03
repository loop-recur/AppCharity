Windows.About = function() {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),
    shadow: UI.BorderShadows().view, 
    submenu_items: [],
    detail_view_proxy: Views.AboutDetail()
  };

  self.win.add(self.shadow);
  self.win.add(self.detail_view_proxy.view);

  Controllers.About(self);

  return self;
};
