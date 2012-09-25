Views.TwitterActions = function(tweet) {
  var self = {
    view: UI.createView({
      layout: 'horizontal'
    }),
    
    reply: UI.createView({
      height: 17,
      width: 26,
      backgroundImage: '/images/icons/twitter_respond.png',
      backgroundSelectedImage: '/images/icons/twitter_respond_p.png',
      className: 'twitter_action'
    }),

    favorite: UI.createView({
      height: 22,
      width: 21,
      backgroundImage: '/images/icons/twitter_fav.png',
      backgroundSelectedImage: '/images/icons/twitter_fav_p.png',
      className: 'twitter_action'
    }),

    retweet: UI.createView({
      height: 15,
      width: 26,
      backgroundImage: '/images/icons/twitter_retweet.png',
      backgroundSelectedImage: '/images/icons/twitter_retweet_p.png',
      className: 'twitter_action'
    }),
    
    tweet: UI.createView({
      height: 15,
      width: 26,
      title: 'tweet',
      className: 'twitter_action'
    })
  }

  self.view.add(self.reply);
  self.view.add(self.favorite);
  self.view.add(self.retweet);
  self.view.add(self.tweet);

  Controllers.TwitterActions(self, tweet);

  return self;
}
