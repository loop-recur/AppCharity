Windows.News = function() {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      layout: 'vertical'
    }),
    
    donate_banner: Views.TopBanner().view,

    table: UI.createTableView({
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    })
  }
  
  self.win.add(self.donate_banner);	 
  self.win.add(self.table);
  
  Controllers.News(self);
  
  return self;
}