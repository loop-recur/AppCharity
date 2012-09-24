Views.TwitterActions = function(tweet) {
  var self = {
    view: UI.createView({
      layout: 'horizontal'
    }),
    
    reply_button: UI.createView({
      title: 'reply'
    }),
    
    favorite_button: UI.createView({
      title: 'favorite'
    }),
    
    retweet_button: UI.createView({
      title: 'retweet'
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
