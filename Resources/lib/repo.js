module.exports = (function() {  
  var PropertyCache = nrequire('/lib/property_cache'),
      Twitter = nrequire('/lib/twitter'),
      FbGraph = nrequire('/lib/fb_graph');
      
  var Cache = {},
      FB_PAGE = 'msf.english',
      FB_ID = '33110852384',      
      TWITTER_SCREENNAME = 'MSF_USA',
  
      _logInAsGenercUserToAvoidErrorHack = function(cb) {
        Cloud.Users.login(ACS_ADMIN_CREDENTIALS, function(e) {
          e.success ? cb(e) : Ti.App.fireEvent('hide_activity');
        });
      },
      
      cacheHasExpired = function(name) {
        return !PropertyCache.get(name);
      },
      
      getFacebookNews = function(callback){
        FbGraph.getNewsFeed(FB_PAGE, function(news){
          news.map(function(n){ n.kind = 'fb'; })
          callback(news);
        });
      },
      
      getTwitterTimeline = function(callback){
        Twitter.timeline({screen_name: TWITTER_SCREENNAME}, function(news){
          news.map(function(n){ n.kind = 'twitter'; })
          callback(news);
        });
      },
      
      getNews = function(callback) {
        if(!cacheHasExpired('news')) { return PropertyCache.get('news', callback); }
        
        var _tryToFinish = function(name, val) {
              Cache[name] = val;
              if(Cache.fb && Cache.twitter) {
                var result = Cache.fb.concat(Cache.twitter);
                PropertyCache.set('news', result);
                callback(result);
                Ti.App.fireEvent('hide_activity');
              }
            };

        Ti.App.fireEvent('show_activity');
        getFacebookNews(function(news){ _tryToFinish('fb', news); })
        getTwitterTimeline(function(news){ _tryToFinish('twitter', news); })
      },
      
      getEvents = function(callback) {
        if(!cacheHasExpired('events')) {  return PropertyCache.get('events', callback); }
        Ti.App.fireEvent('show_activity');
        
        FbGraph.getEventsOlderThan2Weeks(FB_PAGE, FB_ID, function(events){
          PropertyCache.set('events', events);
          callback(events);
          Ti.App.fireEvent('hide_activity');
        });
      },
      
      getPages = function(callback) {
        if(!cacheHasExpired('pages')) { return PropertyCache.get('pages', callback); }
        Ti.App.fireEvent('show_activity');
        Cloud.Objects.query({
            classname: 'AboutUsPage',
            page: 1,
            per_page: 10
        }, function (e) {
          if(e.success) {
            var result = e.AboutUsPage;
            PropertyCache.set('pages', result);
            callback(result);
          } else {
            alert("Error getting the pages. Please try again.");
          }
          Ti.App.fireEvent('hide_activity');
        });
      },
      
      getPhotos = function(callback) {
        if(!cacheHasExpired('cloud_photos')) { return PropertyCache.get('cloud_photos', callback); }
        Ti.App.fireEvent('show_activity');
        Cloud.Photos.query({page: 1, per_page: 20}, function(e) {
          if(e.success) {
            var result = e.photos;
            PropertyCache.set('cloud_photos', result);
            callback(result);
          } else {
            alert('Error Getting photos!');
          }
          Ti.App.fireEvent('hide_activity');
        });
      },
  
      uploadPhoto = function(media, callback) {
        Ti.App.fireEvent('show_activity');
        _logInAsGenercUserToAvoidErrorHack(function() {
          Cloud.Photos.create({ photo: media }, function(e) {
            e.success ? callback(e) : alert('there was a problem uploading your photo');
            Ti.App.fireEvent('hide_activity');
          });
        });
      },
      
      _getKeyVal = function(name, cb) {
        Cloud.KeyValues.get({name: name}, function (e) {
          cb(name, e);
        });
      },
      
      getTopBarMessageAndLogoAndDonateUrl = function(callback) {
        var _isDone = function() {
              return needed_vals.reduce(function(b, x){ return !!Cache[x] && b; }, true);
            },
        
            _cacheValue = function(name, e) {
              if(e.success) {
                Cache[name] = e.keyvalues[0].value;
                if(_isDone()) return callback(Cache);
              }
            },
            
            needed_vals = ['donate_url', 'logo_url'];
            
        if(isIPad) needed_vals.push('topbar_message');
        if(_isDone()) return callback(Cache);
        
        _logInAsGenercUserToAvoidErrorHack(function() {
          needed_vals.map(function(name){ _getKeyVal(name, _cacheValue); });
        });
      };
  
  return {cacheHasExpired: cacheHasExpired,
          getNews: getNews,
          getEvents: getEvents,
          getPages: getPages,
          getPhotos: getPhotos,
          uploadPhoto: uploadPhoto,
          getTopBarMessageAndLogoAndDonateUrl: getTopBarMessageAndLogoAndDonateUrl}
})();
