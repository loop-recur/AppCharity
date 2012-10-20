module.exports = function(vp, screens, current_index) {
  var screens_len = screens.length,
      current_screen= null,

      checkDirection = function(direction) {
        return direction == 'left' ? current_index + 1 : current_index - 1;
      },
    
      hasNextScreen = function(direction) {
        return screens[checkDirection(direction)];
      },

      updateCurrentIndex = function(direction) {
        direction == 'left' ? current_index++ : current_index--;
      },

      buildScreen = function() {
        var img = (screens[current_index] || screens[0]);
        if(current_screen) {
          current_screen.image = img;
        } else {
          current_screen = UI.createImageView({
            image: img, 
            width: Ti.UI.FILL
          });
        }
        return current_screen;
      },

      updateWinTitle = function() {
        vp.win.title = vp.win.title.replace(/\d+/, String(current_index + 1));
      },

      showNextScreen = function(e) {
        var screen;
        if(hasNextScreen(e.direction)) {
          updateCurrentIndex(e.direction);
          buildScreen();
          updateWinTitle();
        }
      };

  var _init = (function() {
      vp.win.add(buildScreen());
    })();

  vp.win.addEventListener('swipe', showNextScreen);

  if(isAndroid) {
    vp.win.addEventListener('close', function() {
      vp.win.backgroundImage = null;
      current_screen.image = null;
      current_screen.defaultImage = null;
    });
  }
};
