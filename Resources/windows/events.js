Windows.Events = function() {
  var self = {
    win: UI.createWindow(),
    
    table: UI.createTableView()
  }

  self.win.add(self.table);

  
  Controllers.Events(self);
  
  return self;
}