Windows.EventDetail = function(event) {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),

    donate_banner: Views.TopBanner().view,

    shadow: UI.BorderShadows({
      top: 100
    }).view,

    detail_view: Views.EventDetail(event),
  };

  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  self.win.add(self.detail_view.view);

  Controllers.EventDetail(self);
  return self;
};
