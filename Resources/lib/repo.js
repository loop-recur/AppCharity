// This is where all main http the calls are made.
// 
module.exports = (function() {  
  var PropertyCache = nrequire('/lib/property_cache'),
      Twitter = nrequire('/lib/twitter'),
      FbGraph = nrequire('/lib/fb_graph');
      
  var Cache = {},
  
      cacheHasExpired = function(name) {
        return !PropertyCache.get(name);
      },
      
      _logInAsGenercAdminToMakeDestructiveCall = function(callback) {
        Cloud.Users.login(ACS_ADMIN_CREDENTIALS, function(e) {
          e.success ? callback(e) : alert("couldn't connect to cloud");
          Ti.App.fireEvent('hide_activity');
        });
      },
      
      // shows activity, checks cache, makes call, and caches.
      _apiCallFactory = function(cache_name, httpCall) {
        return function(callback, opts) {
          opts = (opts || {force_refresh: false});
          if(!opts.force_refresh && !cacheHasExpired(cache_name)) {
            return PropertyCache.get(cache_name, callback);
          }
          Ti.App.fireEvent('show_activity');
          httpCall(function(result) {
            PropertyCache.set(cache_name, result);
            callback(result);
            Ti.App.fireEvent('hide_activity');
          });
        }
      },
      
      getFacebookNews = function(callback){
        FbGraph.getNewsFeed(FB_PAGE, function(news){
          news.map(function(n){ n.kind = 'fb'; });
          callback(news);
        });
      },
      
      getTwitterTimeline = function(callback){
        Twitter.timeline({screen_name: TWITTER_SCREEN_NAME}, function(news){
          news.map(function(n){ n.kind = 'twitter'; });
          callback(news);
        });
      },
      
      getNews = _apiCallFactory('news', function(finishCall) {
        var _finishIfCompletedBoth = function(name, val) {
              Cache[name] = val;
              if(Cache.fb && Cache.twitter) {
                var result = Cache.fb.concat(Cache.twitter);
                finishCall(result);
              }
            };
        getFacebookNews(function(news){ _finishIfCompletedBoth('fb', news); });
        getTwitterTimeline(function(news){ _finishIfCompletedBoth('twitter', news); });
      }),
      
      getEvents = _apiCallFactory('events', function(finishCall){
        FbGraph.getEventsOlderThan2Weeks(FB_PAGE, FB_ID, finishCall);
      }),
      
      getPages = _apiCallFactory('pages', function(finishCall){
        Cloud.Objects.query({classname: 'AboutUsPage', page: 1, per_page: 10}, function(e) {
          e.success ? finishCall(e.AboutUsPage) : alert("Error getting the pages!");
          Ti.App.fireEvent('hide_activity');
        });
      }),
      
      getPhotos = _apiCallFactory('photos', function(finishCall){
        Cloud.Photos.query({page: 1, per_page: 20}, function(e) {
          e.success ? finishCall(e.photos) : alert('Error Getting photos!');
          Ti.App.fireEvent('hide_activity');
        });
      }),
        
      uploadPhoto = function(media, callback) {
        Ti.App.fireEvent('show_activity');
        _logInAsGenercAdminToMakeDestructiveCall(function() {
          Cloud.Photos.create({ photo: media }, function(e) {
            e.success ? callback(e) : alert('there was a problem uploading your photo');
            Ti.App.fireEvent('hide_activity');
          });
        });
      },
      
      _getKeyVal = function(name, callback) {
        Cloud.KeyValues.get({name: name}, function(e) {
          callback(name, e);
        });
      },
      
      getTopBarMessageAndLogoAndDonateUrl = function(callback) {
        var needed_vals = ['donate_url', 'logo_url'],
        
            _isDone = function() {
              return needed_vals.reduce(function(b, x){ return !!Cache[x] && b; }, true);
            },
        
            _cacheValue = function(name, e) {
              if(e.success) {
                Cache[name] = e.keyvalues[0].value;
                if(_isDone()) return callback(Cache);
              }
            };
            
        if(isIPad) needed_vals.push('topbar_message');
        if(_isDone()) return callback(Cache);
        
        _logInAsGenercAdminToMakeDestructiveCall(function() {
          needed_vals.map(function(name){
            _getKeyVal(name, _cacheValue);
          });
        });
      };
  
  return {cacheHasExpired: cacheHasExpired,
          getNews: getNews,
          getEvents: getEvents,
          getPages: getPages,
          getPhotos: getPhotos,
          uploadPhoto: uploadPhoto,
          getTopBarMessageAndLogoAndDonateUrl: getTopBarMessageAndLogoAndDonateUrl};
})();
