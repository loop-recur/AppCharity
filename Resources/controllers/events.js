var _ = require('/support/underscore')
, FbGraph = require('/lib/fb_graph')
, PropertyCache = require('/lib/property_cache')
// , EventDetail = require('/windows/event_detail');
, EventRow = require('/views/event_row');


module.exports = function(view) {
  
  var populateTable = function(events) {
    PropertyCache.set('fb_events', events);
    var rows = events.map(function(e){ return EventRow(e).row; });
    var sorted = _.sortBy(rows, function(r){ return r.start_time; })
    view.table.setData(sorted);
  }
  
  var getEvents = function() {
    FbGraph.getEventsOlderThan2Weeks('msf.english', '33110852384', populateTable);
  }
  
  var getEventsIfItsBeenLongEnough = function() {
    PropertyCache.get('fb_events', populateTable) || getEvents();
  }
  
  var openDetail = function(e) {
    var win = EventDetail(e.row.event).win;
    // ApplicationWindow.events.open(win);
  }
  
  view.win.addEventListener('focus', getEventsIfItsBeenLongEnough);
  view.table.addEventListener('click', openDetail);
}
