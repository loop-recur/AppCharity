module.exports = (function(debug){
  var id = function(x){ return x; }
  
  if(isMobileweb) { return {unsubscribe: id, subscribe: id, addAndroidSettingsEvent: id}; }
  Cloud.debug = true;  // optional; if you add this line, set it to false for production
  
  if(isAndroid) {
    var CloudPush = require('ti.cloudpush');
    CloudPush.enabled = true;
  }
  
  var logInAsGenericUserToAvoidErrorHack = function(cb) {
        Cloud.Users.login({login: 'appcharity', password: '123456'}, function (e) {
          e.success ? cb() : log('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
        });
      },
      
      iphoneRegister = function(pushCallback, registeredCallback) {
        logInAsGenericUserToAvoidErrorHack(function() {
          Ti.Network.registerForPushNotifications({
            types: [
                Ti.Network.NOTIFICATION_TYPE_BADGE,
                Ti.Network.NOTIFICATION_TYPE_ALERT,
                Ti.Network.NOTIFICATION_TYPE_SOUND
            ], success:registeredCallback,
            error: function(e){ Ti.API.info("=========PUSH ERROR\n\n\n"); Ti.API.info(e); },
            callback: function(){
              Ti.UI.iPhone.appBadge = null;
              pushCallback ? pushCallback() : id();
            }
          }); 
        });
      },
      
      androidRegister = function(pushCallback, registeredCallback) {
        logInAsGenericUserToAvoidErrorHack(function() {
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
              log("registeredCallback");
              log(e);
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
          log("registeredCallback!!!");
          log(e);
              unsubscribe(function() {
                Ti.App.Properties.setBool('push_register', true);
                Cloud.PushNotifications.subscribe(
                  {channel: channel, 
                   device_token: e.deviceToken, 
                   type: (isIPhone ? 'ios' : 'android')}, 
                   function (e) { 
                     log("callback after subscribe");
                     if(!e.success) { log('Error:\\n' + ((e.error && e.message) || JSON.stringify(e))); }
                  }
                );
              });
            };
        platformRegister(pushCallback, registeredCallback);
      },
      
      addAndroidSettingsEvent = function(win) {
        var _openPreferences = function() {
              Ti.UI.Android.openPreferences();
              setTimeout(function(){
                var dialog = Ti.UI.createAlertDialog({ title:'Settings', message:'Settings were saved...', ok:'OK' });
     
                dialog.show();
                dialog.addEventListener('click', function(e){
                  if(Ti.App.Properties.getBool('push_enabled')) {
                    subscribe(Ti.App.id);
                  } else {
                    unsubscribe();
                  }
                });
              }, 200);
            };
        if(isAndroid) {
          win.activity.onCreateOptionsMenu = function(e) {
            var settings = e.menu.add({title: 'Settings'});
            settings.addEventListener('click', _openPreferences);
          };
        }
      };

    return {subscribe: subscribe, unsubscribe: unsubscribe, addAndroidSettingsEvent: addAndroidSettingsEvent};
})();

