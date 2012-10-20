module.exports = function() {
  var fb_button = UI.createButton({
        height: 29,
        width: 56,
        right: 100,
        backgroundImage: '/images/buttons/go_to_fb_btn.png',
        backgroundSelectedImage: '/images/buttons/go_to_fb_btn_p.png'
      });
  
  fb_button.addEventListener('click', function() {
    Ti.Platform.openURL('http://www.facebook.com/'+FB_PAGE);
  });
  
  return fb_button;
};
