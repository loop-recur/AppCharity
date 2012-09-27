Windows.FbNewsDetail = function(news) {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),

    donate_banner: Views.TopBanner().view,

    shadow: UI.BorderShadows({
      top: 100,
    }).view,

    table: UI.createTableView({
      top: 100,
      backgroundColor: 'transparent'
    })
  };

  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  // self.win.add(self.table);

  return self;
}