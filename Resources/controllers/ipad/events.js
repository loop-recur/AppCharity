Controllers.IPad.Events = function(view) {
  
  var populateTable = function(events) {
    PropertyCache.set('fb_events', events);
    var rows = events.map(function(e){ return Views.EventRow(e).row; });
    view.table.setData(sortBy('.start_time', rows));
    view.table.fireEvent('click', {row: rows[0] });
  }
  
  var getEvents = function() {
    FbGraph.getEventsOlderThan2Weeks('msf.english', '33110852384', populateTable);
  }
  
  var getEventsIfItsBeenLongEnough = function() {
    PropertyCache.get('fb_events', populateTable) || getEvents();
  }
  
  var openDetail = function(e) {
    var detail = Views.EventDetail(e.row.event);
    view.split_view.detailView.children.map(function(c){ view.split_view.detailView.remove(c);});
    view.split_view.detailView.add(detail.view);
  }
  
  view.win.addEventListener('focus', getEventsIfItsBeenLongEnough);
  view.table.addEventListener('click', openDetail);
}
