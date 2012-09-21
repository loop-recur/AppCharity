Windows.News = function() {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      layout: 'vertical'
    }),
    
    donate_banner: Views.TopBanner().view,

    table: UI.createTableView()
  }
  
  self.win.add(self.donate_banner);	 
  self.win.add(self.table);
  
  Controllers.News(self);
  
  return self;
}