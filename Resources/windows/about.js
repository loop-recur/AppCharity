Windows.About = function() {
  var self = {
    win: UI.createWindow({
      layout: 'vertical',
      navBarHidden: true
    })
  };

  Controllers.About(self);

  return self;
};
