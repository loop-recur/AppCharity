Windows.News = function() {
  var self = {
    win: UI.createWindow(),
    
    table: UI.createTableView()
  }
  
  self.win.add(self.table);
  
  Controllers.News(self);
  
  return self;
}