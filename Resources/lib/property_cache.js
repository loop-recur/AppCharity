// Caches anything in Ti Properties as json for specified time.
module.exports = (function() {
  var cache_time = 120000,
  
      _currentTime = function(){
        return new Date().getTime();
      },
  
      _withinCacheTime = function(timestamp) {
        var date = new Date(timestamp),
            now = _currentTime(),
            calcdate = new Date(now - cache_time);
        return  calcdate < date;
      },
  
      get = function(x, cb, opts) {
        opts = (opts || {force: false});
        var a = Ti.App.Properties.getString(x);
    
        if(a) {
          var json = JSON.parse(a);
          if(opts.force || _withinCacheTime(json.cached_at)) {
            if(cb) { cb(json.data); }
            return true;
          }
        }
      },

      set = function(name, x) {
        Ti.App.Properties.setString(name, JSON.stringify({cached_at: _currentTime(), data: x}));
        return x;
      },
  
      setup = function(cfg) {
        cache_time = cfg.cache_time;
      };

  return {set: set, get: get, setup: setup};
})();
