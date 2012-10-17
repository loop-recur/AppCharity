var Controller = nrequire('templates/controllers/slideshow');

module.exports.render = function(screens, index) {
  var self = { 
      win: UI.createWindow({
          title: 'Showing ' + (index+1)  + ' of ' + screens.length,
          navBarHidden: false,
          backgroundColor: 'black',
          barColor:'#000',
          orientationModes: [Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
        }) 
      };

  Controller(self, screens, index);
  return self;
};

