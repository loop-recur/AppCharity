module.exports = function(view) {  
  var TwitterNewsRow = nrequire('/templates/views/twitter_news_row'),
      FbNewsRow = nrequire('/templates/views/fb_news_row'),
      FbNewsDetail = nrequire('/templates/windows/fb_news_detail'),
      TwitterNewsDetail = nrequire('/templates/windows/twitter_news_detail'),
      PullToRefresh = nrequire('/ui/pull_to_refresh'),
      Repo = nrequire('/lib/repo');
      
  var VIEW_TYPES = {'fb': {detail: FbNewsDetail, row: FbNewsRow},
                    'twitter': {detail: TwitterNewsDetail, row: TwitterNewsRow}},
      news = [],
  
      fillTable = function(rows) {
        var all_rows = _.sortBy(rows, function(x) { return x.created; });
        view.table.setData(all_rows.reverse());
      },
      
      makeNewsRows = function(news) {
        return news.map(function(n){
          return VIEW_TYPES[n.kind].row.render(n).row;
        });
      },
  
      refreshNews = function(endPullToRefresh) {
        Repo.getNews(function(news) {
          fillTable(makeNewsRows(news));
          endPullToRefresh();
        }, {force_refresh: true});
      },
      
      hasntRenderedPage = function() {
        return !(view.table.data && view.table.data[0]);
      },
      
      populatePage = function() {
        if(Repo.cacheHasExpired('news') || hasntRenderedPage()) {
          Repo.getNews(function(news) {
            fillTable(makeNewsRows(news));
          });
        }
      },
      
      shouldOpenDetail = function(source) {
        return (source && source.id) != "twitter_action";
      },
  
      openDetail = function(e) {
        if(shouldOpenDetail(e.source)) {
          var detail = VIEW_TYPES[e.row.kind].detail.render(e.row.news);
          Application.news.open(detail.win);          
        }
      };
  
  view.win.addEventListener('focus', populatePage);
  if(!isIPad) view.table.addEventListener('click', openDetail);
  if(!isAndroid) { PullToRefresh(view.table, refreshNews); }
};
