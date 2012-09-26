var UI = require("/ui/proxies")
, Twitter = require("/lib/twitter");

module.exports = function(view, tweet){
  
  var retweet = function(e) {
    Twitter.retweet(tweet.id_str, function(e) {
      if(e.success) UI.createAlertMessage("You've successfully retweeted!");
    });
  }
  
  var favorite = function(e) {
    Twitter.favorite(tweet.id_str, function(e) {
      if(e.success) UI.createAlertMessage("You've successfully favorited!");
    });
  }
  
  view.retweet.addEventListener('click', retweet);
  view.favorite.addEventListener('click', favorite);
}
