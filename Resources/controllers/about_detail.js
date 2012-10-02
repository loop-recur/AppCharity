Controllers.AboutDetail = function(view) {
  
  var tweet = function() {
    Twitter.tweet("Okay, think we're good", log);
  }
  
  // var fb_share = function() {
  //   FbGraph.wallPost({message:"I just luvvved this page", link: page.link}, log);
  // }
  
  view.tweet_button.addEventListener('click', tweet);
  // view.fb_button.addEventListener('click', fb_share);
}
