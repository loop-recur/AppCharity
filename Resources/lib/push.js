// Push subscription library.  We decorate each window with the push settings screen on android
// in proxies.js to unsubscribe.  iOS should just use the app push prefs in the settings app.
// 
module.exports = (function(debug){
  var PreferencesWinWithDialogCallback = nrequire('/ui/preferences_win_with_dialog_callback'),
      id = function(x){ return x; };
  
  if(isMobileweb) { return {unsubscribe: id, subscribe: id, addAndroidSettingsEvent: id}; }
  Cloud.debug = true;  // optional; if you add this line, set it to false for production
  
  if(isAndroid) {
    var CloudPush = require('ti.cloudpush');
    CloudPush.enabled = true;
  }
  
  var _logInAsGenercAdminToMakeDestructiveCall = function(cb) {
        Cloud.Users.login(ACS_ADMIN_CREDENTIALS, function (e) {
          e.success ? cb() : alert('error accessing cloud services');
        });
      },
      
      iphoneRegister = function(pushCallback, registeredCallback) {
        _logInAsGenercAdminToMakeDestructiveCall(function() {
          Ti.Network.registerForPushNotifications({
            types: [
                Ti.Network.NOTIFICATION_TYPE_BADGE,
                Ti.Network.NOTIFICATION_TYPE_ALERT,
                Ti.Network.NOTIFICATION_TYPE_SOUND
            ], success:registeredCallback,
            error: function(e){ Ti.API.info(e); },
            callback: function(){
              Ti.UI.iPhone.appBadge = null;
              pushCallback ? pushCallback() : id();
            }
          }); 
        });
      },
      
      androidRegister = function(pushCallback, registeredCallback) {
        _logInAsGenercAdminToMakeDestructiveCall(function() {
          if(pushCallback) { CloudPush.addEventListener('callback', pushCallback); }
          CloudPush.retrieveDeviceToken({
            success: registeredCallback,
            error: function(e) { log('There was an error '+e.error); }
          });
        });
      },

      platformRegister = isIPhone ? iphoneRegister : androidRegister,
      
      unsubscribe = function(cb) {
        var registeredCallback = function(e) {
              Ti.App.Properties.setBool('push_register', false);
              Cloud.PushNotifications.unsubscribe(
                {device_token: e.deviceToken},
                function(e) { if(cb) { cb(); } }
              );
            };
        platformRegister(id, registeredCallback);
      }, 

      subscribe = function(channel, pushCallback) {
        var registeredCallback = function(e) {
              unsubscribe(function() {
                Ti.App.Properties.setBool('push_register', true);
                Cloud.PushNotifications.subscribe(
                  {channel: channel, 
                   device_token: e.deviceToken, 
                   type: (isIPhone ? 'ios' : 'android')}, 
                   function (e) { 
                     if(!e.success) { alert("Couldn't subscribe you to push!"); }
                  }
                );
              });
            };
        platformRegister(pushCallback, registeredCallback);
      },
      
      addAndroidSettingsEvent = function(win) {
        win.activity.onCreateOptionsMenu = function(e) {
          var settings = e.menu.add({title: 'Settings'});
          
          settings.addEventListener('click', function() {
            PreferencesWinWithDialogCallback(function() {
              Ti.App.Properties.getBool('push_enabled') ? subscribe(Ti.App.id) : unsubscribe();
            });
          });
        };
      };

    return {subscribe: subscribe,
            unsubscribe: unsubscribe,
            addAndroidSettingsEvent: addAndroidSettingsEvent};
})();
