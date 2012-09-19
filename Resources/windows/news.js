Windows.News = function() {
  var self = {
    win: UI.createWindow(),
    table: UI.createTableView()
  }
  
  Controllers.News(self);
  
  self.win.add(self.table);
  
  return self;
}