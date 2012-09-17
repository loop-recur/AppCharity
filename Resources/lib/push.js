Push = (function(debug){
  var Cloud = require('../commonjs/ti.cloud/2.3.0/ti.cloud');
  Cloud.debug = true;  // optional; if you add this line, set it to false for production
  
  if(isAndroid) {
    var CloudPush = require('ti.cloudpush');
    CloudPush.enabled = true;
    CloudPush.debug = true;
  }
  
  var deviceToken = "",
  
      logInAsGenercUserToAvoidErrorHack = function(cb) {
        Cloud.Users.login({login: 'drboolean', password: '123456'}, function (e) {
          e.success ? cb() : alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
        });
      },
      
      iphoneRegister = function(pushCallback, registeredCallback) {
        return function() {
          Ti.Network.registerForPushNotifications({
            types: [
                Ti.Network.NOTIFICATION_TYPE_BADGE,
                Ti.Network.NOTIFICATION_TYPE_ALERT,
                Ti.Network.NOTIFICATION_TYPE_SOUND
            ],
            success:registeredCallback,
            error:Ti.API.info,
            callback:pushCallback
          }); 
        }
      },
      
      androidRegister = function(pushCallback, registeredCallback) {
        CloudPush.addEventListener('callback', pushCallback);
        return function() {
          CloudPush.retrieveDeviceToken({
            success: registeredCallback,
            error: function(e) { alert('There was an error '+e.error); }
          });
        }
      },
      
      subscribe = function(channel) {
        return function(e) {
          Cloud.PushNotifications.subscribe({channel: channel, 
                                             device_token: e.deviceToken,
                                             type: (isIPhone ? 'iphone' : 'android')
          }, function (e) {
            if(!e.success) { alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e))); }
          });
        }
      },
      
      register = function(channel, pushCallback) {
        var cb = isIPhone ? iphoneRegister : androidRegister;
        logInAsGenercUserToAvoidErrorHack(cb(pushCallback, subscribe(channel)));
      };
      
    return {register: register};
})();
