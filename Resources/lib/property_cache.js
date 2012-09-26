module.exports = (function() {
  var cache_time = 120000;
  
  var _currentTime = function(){
    return new Date().getTime();
  }
  
  var _withinCacheTime = function(timestamp) {
    var date = new Date(timestamp);
    var now = _currentTime();
    var calcdate = new Date(now - cache_time);
    return  calcdate < date;
  }
  
  var get = function(x, cb) {
    var a =  Ti.App.Properties.getString(x);
    
    if(a) {
      var json = JSON.parse(a);
      if(_withinCacheTime(json.cached_at)) {
        cb(json.data);
        return true;
      }
    }
  }

  var set = function(name, x) {
    Ti.App.Properties.setString(name, JSON.stringify({cached_at: _currentTime(), data: x}));
    return x;
  };
  
  setup = function(cfg) {
    cache_time = cfg.cache_time;
  }

  return {set: set, get: get, setup: setup}
})();
