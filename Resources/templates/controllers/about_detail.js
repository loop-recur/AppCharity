module.exports = function(view) {
  var FbGraph = nrequire('/lib/fb_graph'),
      Twitter = nrequire('/lib/twitter');
      
  var TWEET_MSG = "I like @MSF_USA",
      FB_MSG = "I like this page!",
      FB_LINK = 'http://www.facebook.com/msf.english',
  
      tweet = function() {
        Twitter.tweet(TWEET_MSG, function(e){
          if(e.success) { alert("You've successfully tweeted"); }
        });
      },
  
      fbShare = function(e) {
        FbGraph.wallPost({message:FB_MSG, link: FB_LINK}, function(e){
          if(e.success) { alert("You've successfully posted to your wall"); }
        });
      };    
  
  view.tweet_button.addEventListener('click', tweet);
  view.fb_button.addEventListener('click', fbShare);
};
