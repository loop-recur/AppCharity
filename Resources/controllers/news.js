Controllers.News = function(view) {
  
  var populateTable = function(news) {
    var rows = news.map(function(n){ return Views.NewsRow(n).row; });
    view.table.setData(rows);
  }
  
  var getNews = FbGraph.getNewsFeed.p(populateTable);
  
  view.win.addEventListener('focus', getNews);
}

