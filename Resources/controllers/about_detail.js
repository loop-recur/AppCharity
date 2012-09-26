var _ = Twitter = require("/lib/twitter")
, FbGraph = require("/lib/fb_graph");

module.exports = function(view, page) {
  
  var tweet = function() {
    Twitter.tweet("Okay, think we're good", function(){});
  }
  
  var fb_share = function() {
    FbGraph.wallPost({message:"I just luvvved this page", link: page.link}, function(){});
  }
  
  view.tweet_button.addEventListener('click', tweet);
  view.fb_button.addEventListener('click', fb_share);
}
