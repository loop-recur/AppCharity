Windows.Events = function() {
  var self = {
    win: UI.createWindow({
      layout: 'vertical',
      navBarHidden: true
    }),

    donate_banner: Views.TopBanner().view,

    table: UI.createTableView()
  };

  self.win.add(self.donate_banner);
  self.win.add(self.table);

  Controllers.Events(self);

  return self;
};
