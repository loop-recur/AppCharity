Windows.About = function() {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),

    top_shadow: UI.createView({
      top: 0,
      width: Ti.UI.FILL,
      height: 20,
      backgroundImage: '/images/shadow/screen_shadow_top.png'
    }),

    side_shadow: UI.createView({
      top: 20,
      bottom: 20,
      backgroundImage: '/images/shadow/screen_shadow_sides_repeat.png',
      width: Ti.UI.FILL,
      height: Ti.UI.FILL
    }),

    bottom_shadow: UI.createView({
      bottom: 0,
      width: Ti.UI.FILL,
      height: 20,
      backgroundImage: '/images/shadow/screen_shadow_bottom.png'
    }),
  };

  self.win.add(self.top_shadow);
  self.win.add(self.side_shadow);
  self.win.add(self.bottom_shadow);

  Controllers.About(self);

  return self;
};
