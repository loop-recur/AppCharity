module.exports = function(win, props) {  
  var btn = UI.createButton(_.extend({
        backgroundImage: '/images/buttons/big_back.png',
        backgroundSelectedImage: '/images/buttons/big_back_p.png',
        height: 36,
        width: 302,
        zIndex: 25,
        top: 110
      }, (props || {})));
  
  if(!isAndroid) {
    btn.addEventListener('click', function() {
      win.close();
    });
  }
  
  return btn;
};
