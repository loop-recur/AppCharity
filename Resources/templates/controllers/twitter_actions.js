module.exports = function(view, tweet) {
  var TweetWin = nrequire('/templates/windows/tweet'),
      Twitter = nrequire('/lib/twitter');
  
  var retweet = function() {
        Twitter.retweet(tweet.id_str, function(e) {
          if(e.success) UI.createAlertMessage("You've successfully retweeted!");
        });
      },
  
      favorite = function() {
        Twitter.favorite(tweet.id_str, function(e) {
          if(e.success) UI.createAlertMessage("You've successfully favorited!");
        });
      },
  
      reply = function() {
        view.tweet_view = TweetWin.render(tweet.user.screen_name, function(text){
          Twitter.reply(tweet.id_str, text, function(e) {
            if(e.success) UI.createAlertMessage("You've successfully replied!");
          });
        });
    
      Application.news.open(view.tweet_view.win);
      };
  
  view.retweet.addEventListener('click', retweet);
  view.favorite.addEventListener('click', favorite);
  view.reply.addEventListener('click', reply);
};
