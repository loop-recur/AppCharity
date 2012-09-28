Controllers.News = function(view) {
  var state = {};
  
  var tryTofinish = function() {
    if(state.fb_rows && state.tweet_rows) {
      var all_rows = state.fb_rows.concat(state.tweet_rows);
      view.table.setData(sortBy('.created', all_rows));
    }
  }
  
  var finishTwitter = function(tweets) {
    state.tweet_rows = tweets.map(function(n){ return Views.TwitterNewsRow(n).row; });
    PropertyCache.set('tweets', tweets);
    tryTofinish();
  }
  
  var finishFb = function(news) {
    state.fb_rows = news.map(function(n){ return Views.FbNewsRow(n).row; });
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
    if((e.source && e.source.className) == "twitter_action") {
      return;
    }

    var row = e.row;
    log(row);
    var detail = (row.kind === "fb") ? Windows.FbNewsDetail(row.news) : Windows.TwitterNewsDetail(row.news)
    log(row.news);
    Windows.Application.news.open(detail.win);
  }
  
  view.win.addEventListener('focus', getNewsIfItsBeenLongEnough);
  view.table.addEventListener('click', openDetail);
}
