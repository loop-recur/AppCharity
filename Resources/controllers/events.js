Controllers.Events = function(view) {
  
  var populateTable = function(events) {
    PropertyCache.set('fb_events', events);
    var rows = events.map(function(e){ return Views.EventRow(e).row; });
    view.table.setData(sortBy('.start_time', rows));
  }
  
  var getEvents = function() {
    FbGraph.getEventsOlderThan2Weeks('msf.english', '33110852384', populateTable);
  }
  
  var getEventsIfItsBeenLongEnough = function() {
    PropertyCache.get('fb_events', populateTable) || getEvents();
  }
  
  var openDetail = function(e) {
    var win = Windows.EventDetail(e.row.event).win;
    Windows.Application.events.open(win);
  }
  
  view.win.addEventListener('focus', getEventsIfItsBeenLongEnough);
  view.table.addEventListener('click', openDetail);
}
