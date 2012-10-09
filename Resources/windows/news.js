Windows.News = function() {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundColor: "#f5f1f1"
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
  self.win.add(self.table);

  Controllers.News(self);

  return self;
};
