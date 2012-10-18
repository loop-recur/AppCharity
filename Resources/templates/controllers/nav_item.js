module.exports = function(view) {
  var swapImageForViewWithBackgroundSoItStretches = function(e) {
        var i = view.image.image;
        view.scroll.add(UI.createView({backgroundImage: i}));
        view.scroll.remove(view.image);
      };
  
  view.image.addEventListener('load', swapImageForViewWithBackgroundSoItStretches);
};
