module.exports = function(view) {
  var EventRow = nrequire('/templates/views/event_row'),
      Detail = isIPad ? nrequire('/templates/views/event_detail') : nrequire('/templates/windows/event_detail'),
      PullToRefresh = nrequire('/ui/pull_to_refresh'),
      Repo = nrequire('/lib/repo');
  
  
  var fillTable = function(events) {
        var rows = events.map(function(e){ return EventRow.render(e).row; });
        view.table.setData(_.sortBy(rows, function(x){ return x.start_time; }));
        if(isIPad) view.table.fireEvent('click', {row: rows[0] });
      },
      
      refreshEvents = function(endPullToRefresh) {
        Repo.getEvents(fillTable, {force_refresh: true});
        endPullToRefresh();
      },
      
      hasntRenderedPage = function() {
        return !(view.table.data && view.table.data[0]);
      },

      populatePage = function() {
        if(Repo.cacheHasExpired('events') || hasntRenderedPage()) { Repo.getEvents(fillTable); }
      },
      
      openDetail = function(e) {
        var detail = Detail.render(e.row.event);
        if(isIPad) {
          view.split_view.detailView.children.map(function(c){ view.split_view.detailView.remove(c);});
          view.split_view.detailView.add(detail.view);
        } else {
          Application.events.open(detail.win);
        }
      };
  
  view.win.addEventListener('focus', populatePage);
  view.table.addEventListener('click', openDetail);
  
  if(!isAndroid) { PullToRefresh(view.table, refreshEvents); }
};
