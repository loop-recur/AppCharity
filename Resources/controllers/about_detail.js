Controllers.AboutDetail = function(view, page) {
  
  var tweet = function() {
    Twitter.tweet("I hate testing twitter apps with my real account", log);
  }
  
  var fb_share = function() {
    FbGraph.wallPost({message:"I just luvvved this page", link: page.link}, log);
  }
  
  view.tweet_button.addEventListener('click', tweet);
  view.fb_button.addEventListener('click', fb_share);
}

