Controllers.AboutDetail = function(view) {
  
  var tweet = function() {
    Twitter.tweet("I like @MSF_USA", function(e){
      if(e.success) alert("You've successfully tweeted");
    });
  }
  
  var fb_share = function(e) {
    FbGraph.wallPost({message:"I like this page!", link: 'http://www.facebook.com/msf.english'}, function(e){
      if(e.success) alert("You've successfully posted to your wall");
    });
  }
  
  view.tweet_button.addEventListener('click', tweet);
  view.fb_button.addEventListener('click', fb_share);
}
