Windows.IPad.Events = function() {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),
    
    split_view: SplitView("Events"),

    donate_banner: Views.TopBanner().view,

    shadow: UI.BorderShadows({
      top: 100,
    }).view,

    table: UI.createTableView({
      top: 100,
      backgroundColor: 'transparent'
    })
  };

  self.win.add(self.shadow);
  self.win.add(self.table);
  
  self.split_view.open();
  self.win.add(self.split_view);
  self.split_view.detailView.add(self.donate_banner);

  Controllers.Events(self);

  return self;
};
