Controllers.TwitterActions = function(view, tweet){
  
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
  
  view.retweet_button.addEventListener('click', retweet);
  view.favorite_button.addEventListener('click', favorite);
}
