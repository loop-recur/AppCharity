Windows.About = function() {
  var self = {
    win: UI.createWindow()
  }
  
  Controllers.About(self);
  
  return self;
}