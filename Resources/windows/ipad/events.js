Windows.IPad.Events = function() {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),
    
    split_view: SplitView(),

    donate_banner: Views.TopBanner().view,

    shadow: UI.BorderShadows({
      top: 100,
    }).view,

    table: UI.createTableView({
      top: 100,
      backgroundColor: "transparent",
			separatorColor:'rgba(183,183,183,.5)'
    })
  };

  self.win.add(self.shadow);
  
  self.split_view.open();
  self.win.add(self.split_view);
  
  self.win.add(self.donate_banner);
  self.split_view.detailView.add(self.shadow);
  self.split_view.masterView.add(self.table);

  Controllers.IPad.Events(self);

  return self;
};
