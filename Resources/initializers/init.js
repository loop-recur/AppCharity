// Some helpful globals and namespaces
UI = {};
log = function(x){ Ti.API.info(x); };
_ = null;

var Push = nrequire('/lib/push');

var subscribePushNotifications = function() {
  var channel = Ti.App.id;
  Push.subscribe(channel);
};

// initialize and open the app.
var init = function(testing) {
  _ = nrequire('/support/underscore');
  nrequire('/ui/proxies');
  Application = nrequire('/windows/application');
  Application.open();
  subscribePushNotifications();
};

module.exports = {init: init};
