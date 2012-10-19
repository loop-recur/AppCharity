module.exports = (function() {  
  var Cache = {},
  
      ADMIN_CREDENTIALS = {login: 'appcharity', password: '123456'},
  
      _logInAsGenercUserToAvoidErrorHack = function(cb) {
        Cloud.Users.login(ADMIN_CREDENTIALS, function(e) {
          e.success ? cb(e) : Ti.App.fireEvent('hide_activity');
        });
      },
      
      getPages = function(callback) {
        Ti.App.fireEvent('show_activity');
        Cloud.Objects.query({
            classname: 'AboutUsPage',
            page: 1,
            per_page: 10
        }, function (e) {
          callback(e);
          Ti.App.fireEvent('hide_activity');
        });
      },
      
      getPhotos = function(callback) {
        Ti.App.fireEvent('show_activity');
        Cloud.Photos.query({page: 1, per_page: 20}, function(e) {
          callback(e);
          Ti.App.fireEvent('hide_activity');
        });
      },
  
      uploadPhoto = function(media, callback) {
        Ti.App.fireEvent('show_activity');
        _logInAsGenercUserToAvoidErrorHack(function() {
          Cloud.Photos.create({ photo: media }, function(e) {
            callback(e);
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
        var needed_vals = ['donate_url', 'logo_url'];
        if(isIPad) needed_vals.push('topbar_message');
        
        var _isDone = function() {
              return needed_vals.reduce(function(b, x){ return !!Cache[x] && b; }, true);
            },
        
            _cacheValue = function(name, e) {
              if(e.success) {
                Cache[name] = e.keyvalues[0].value;
                if(_isDone()) return callback(Cache);
              }
            };
        
        if(_isDone()) return callback(Cache);
        
        _logInAsGenercUserToAvoidErrorHack(function() {
          needed_vals.map(function(name){ _getKeyVal(name, _cacheValue); });
        });
      };
  
  return {getPages: getPages,
          getPhotos: getPhotos,
          uploadPhoto: uploadPhoto,
          getTopBarMessageAndLogoAndDonateUrl: getTopBarMessageAndLogoAndDonateUrl}
})();
