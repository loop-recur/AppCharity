Windows.Events = function() {
  var self = {
    win: UI.createWindow()
  }
  
  Controllers.Events(self);
  
  return self;
}