var _ = require('/support/underscore')
, ApplicationWindow = require('/windows/application')
, FbNewsRow = require("/views/fb_news_row")
, TwitterNewsRow = require("/views/twitter_news_row")
, FbNewsDetail = require("/windows/fb_news_detail")
, TwitterNewsDetail = require("/windows/twitter_news_detail")
, Twitter = require("/lib/twitter")
, FbGraph = require("/lib/fb_graph")
, PropertyCache = require("/lib/property_cache");

module.exports = function(view) {
  var state = {};
  
  var tryTofinish = function() {
    if(state.fb_rows && state.tweet_rows) {
      var all_rows = state.fb_rows.concat(state.tweet_rows);
      var sorted_rows = _.sortBy(all_rows, function(x){ return x.created; });
      view.table.setData(sorted_rows);
    }
  }
  
  var finishTwitter = function(tweets) {
    state.tweet_rows = tweets.map(function(n){ return TwitterNewsRow(n).row; });
    PropertyCache.set('tweets', tweets);
    tryTofinish();
  }
  
  var finishFb = function(news) {
    state.fb_rows = news.map(function(n){ return FbNewsRow(n).row; });
    PropertyCache.set('fb_news', news);
    tryTofinish();
  }
  
  var getNews = function() {
    FbGraph.getNewsFeed('msf.english', finishFb);
    Twitter.timeline({screen_name: "MSF_USA"}, finishTwitter);
  }
  
  var getCachedNews = function() {
    return PropertyCache.get('fb_news', finishFb) && PropertyCache.get('tweets', finishTwitter);
  }
  
  var getNewsIfItsBeenLongEnough = function() {
    getCachedNews() || getNews();
  }
  
  var openDetail = function(e) {
    if((e.source && e.source.className) == "twitter_action") return;
    var row = e.row;
    var detail = (row.kind === "fb") ? FbNewsDetail(row.news) : TwitterNewsDetail(row.news)
    ApplicationWindow.news.open(detail.win);
  }
  
  view.win.addEventListener('focus', getNewsIfItsBeenLongEnough);
  view.table.addEventListener('click', openDetail);
}
