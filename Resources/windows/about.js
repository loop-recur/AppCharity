Windows.About = function() {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),

    shadow: UI.BorderShadows({
      top: 0,
    }).view
  };

  self.win.add(self.shadow);

  Controllers.About(self);

  return self;
};
