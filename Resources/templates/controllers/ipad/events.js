var Detail = nrequire('templates/views/event_detail'),
    FbGraph = nrequire('lib/fb_graph'),
    EventRow = nrequire('templates/views/event_row'),
    PropertyCache = nrequire('/lib/property_cache'),
    PullToRefresh = nrequire('/ui/pull_to_refresh');

module.exports = function(view) {
  var populateTable = function(events) {
    PropertyCache.set('fb_events', events);
    var rows = events.map(function(e){ return EventRow.render(e).row; });
    view.table.setData(sortBy('.start_time', rows));
    view.table.fireEvent('click', {row: rows[0] });
  }
  
  var getEvents = function(cb) {
    FbGraph.getEventsOlderThan2Weeks('msf.english', '33110852384', function(events){
      populateTable(events);
      if(cb) cb();
    });
  }
  
  var getEventsIfItsBeenLongEnough = function() {
    PropertyCache.get('fb_events', populateTable) || getEvents();
  }
  
  var openDetail = function(e) {
    var detail = Detail(e.row.event);
    view.split_view.detailView.children.map(function(c){ view.split_view.detailView.remove(c);});
    view.split_view.detailView.add(detail.view);
  }
  
  view.win.addEventListener('focus', getEventsIfItsBeenLongEnough);
  view.table.addEventListener('click', openDetail);
  
  PullToRefresh(function(end){
    getEvents(end);
  }, view.table);
};

