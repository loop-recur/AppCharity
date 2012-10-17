var Controller = nrequire('templates/controllers/twitter_actions');

module.exports.render = function(tweet) {
  var self = {
    view: UI.createView({
      layout: 'horizontal',
      top: 5,
      bottom: 5,
      height: Ti.UI.SIZE,
      id: 'twitter_action'
    }),

    reply: UI.createView({
      height: 17,
      width: 26,
      backgroundImage: '/images/icons/twitter_respond.png',
      backgroundSelectedImage: '/images/icons/twitter_respond_p.png',
      id: 'twitter_action'
    }),

    favorite: UI.createView({
      height: 22,
      width: 21,
      left: 25,
      backgroundImage: '/images/icons/twitter_fav.png',
      backgroundSelectedImage: '/images/icons/twitter_fav_p.png',
      id: 'twitter_action'
    }),

    retweet: UI.createView({
      height: 15,
      width: 26,
      left: 25,
      backgroundImage: '/images/icons/twitter_retweet.png',
      backgroundSelectedImage: '/images/icons/twitter_retweet_p.png',
      id: 'twitter_action'
    }),

    tweet_button: UI.createButton({
      height: 28,
      width: 56,
      left: 50,
      backgroundImage: '/images/buttons/go_to_twitter_btn.png',
      backgroundSelectedImage: '/images/buttons/go_to_twitter_btn_p.png',
      id: 'twitter_action'
    })
  };

  self.view.add(self.reply);
  self.view.add(self.favorite);
  self.view.add(self.retweet);
  self.view.add(self.tweet_button);

  Controller(self, tweet);

  return self;
};

