module.exports = function() {
  var tweet_button = UI.createButton({
        height: 28,
        width: 56,
        left: 50,
        backgroundImage: '/images/buttons/go_to_twitter_btn.png',
        backgroundSelectedImage: '/images/buttons/go_to_twitter_btn_p.png',
        id: 'twitter_action',
        style_id: 'tweet_btn'
      });
  
  tweet_button.addEventListener('click', function(e) {
    Ti.Platform.openURL('http://www.twitter.com/'+TWITTER_SCREEN_NAME);
  });
    
  return tweet_button;
};
