var FbGraph = nrequire('lib/fb_graph'),
    EventRow = nrequire('templates/views/event_row'),
    Detail = nrequire('templates/windows/event_detail'),
    PullToRefresh = nrequire('/ui/pull_to_refresh'),
    PropertyCache = nrequire('/lib/property_cache'),
    Push = nrequire('/lib/push');

module.exports = function(view) {
  
  var populateTable = function(events) {
    PropertyCache.set('fb_events', events);
    var rows = events.map(function(e){ return EventRow.render(e).row; });
    view.table.setData(sortBy('.start_time', rows));
  }
  
  var getEvents = function(cb) {
    FbGraph.getEventsOlderThan2Weeks('msf.english', '33110852384', function(events){
      populateTable(events);
      if(cb) cb();
    });
  }
  
  var getEventsIfItsBeenLongEnough = function() {
    if(PropertyCache.get('fb_events', id) && view.table.data && view.table.data[0]) return;
    PropertyCache.get('fb_events', populateTable) || getEvents();
  }
  
  var openDetail = function(e) {
    var detail = Detail.render(e.row.event);
    Application.events.open(detail.win);
  }
  
  view.win.addEventListener('focus', getEventsIfItsBeenLongEnough);
  view.table.addEventListener('click', openDetail);
  
  Push.addAndroidSettingsEvent(view.win);

  if(!isAndroid) {
    PullToRefresh(function(end){
      getEvents(end);
    }, view.table);
  }
};

