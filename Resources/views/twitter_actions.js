Views.TwitterActions = function(tweet) {
  var self = {
    view: UI.createView({
      layout: 'horizontal'
    }),
    
    reply_button: UI.createView({
      height: 17,
      width: 26,
      backgroundImage: '/images/icons/twitter_respond.png',
      backgroundSelectedImage: '/images/icons/twitter_respond_p.png'
    }),

    favorite_button: UI.createView({
      height: 22,
      width: 21,
      backgroundImage: '/images/icons/twitter_fav.png',
      backgroundSelectedImage: '/images/icons/twitter_fav_p.png'
    }),

    retweet_button: UI.createView({
      height: 15,
      width: 26,
      backgroundImage: '/images/icons/twitter_retweet.png',
      backgroundSelectedImage: '/images/icons/twitter_retweet_p.png'
    }),
    
    tweet_button: UI.createView({
      title: 'tweet'
    })
  }

  self.view.add(self.reply_button);
  self.view.add(self.favorite_button);
  self.view.add(self.retweet_button);
  self.view.add(self.tweet_button);
  
  Controllers.TwitterActions(self, tweet);

  return self;
}
