Controllers.News = function(view) {
  var state = {};
  
  var tryTofinish = function() {
    if(state.fb_rows && state.tweet_rows) {
      var all_rows = state.fb_rows.concat(state.tweet_rows);
      view.table.setData(sortBy('.created', all_rows));
    }
  }
  
  var getNews = function() {
    FbGraph.getNewsFeed(function(news) {
      state.fb_rows = news.map(function(n){ return Views.FbNewsRow(n).row; });
      tryTofinish();
    });
    
    Twitter.timeline({screen_name: "MSF_USA"}, function(tweets) {
      state.tweet_rows = tweets.map(function(n){ return Views.TwitterNewsRow(n).row; });
      tryTofinish();
    });
  }
  
  var openDetail = function(e) {
    var row = e.row;
    var detail = (row.kind === "fb") ? Windows.FbNewsDetail(row.news) : Windows.TwitterNewsDetail(row.news);
    Windows.Application.news.open(detail.win);
  }
  
  view.win.addEventListener('focus', getNews);
  view.table.addEventListener('click', openDetail);
}
