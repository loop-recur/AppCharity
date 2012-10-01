Windows.Slideshow = function(screens, index) {
  var self = { 
      win: UI.createWindow({
          title: 'screenshot_detail_win_title ' + (index + 1),
          backgroundImage: '/images/bg_gray_320x480.png', 
          barColor:'#000',
          orientationModes: [Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
        }) 
      };

  Controllers.Slideshow(self, screens, index);
  return self;
};
