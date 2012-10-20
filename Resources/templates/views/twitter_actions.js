var render = function(tweet) {
  var Controller = nrequire('/templates/controllers/twitter_actions'),
      tweetButton = nrequire('/ui/tweet_button');
  
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

        tweet_button: tweetButton()
      };

  self.view.add(self.reply);
  self.view.add(self.favorite);
  self.view.add(self.retweet);
  self.view.add(self.tweet_button);

  Controller(self, tweet);
  return self;
};

module.exports = {render: render};
