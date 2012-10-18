log = function(x){ Ti.API.info(x); }
UI = {};
_ = null;
Push = nrequire('/lib/push');

var subscribePushNotifications = function() {
  var channel = Ti.App.id;
  Push.subscribe(channel);
};

module.exports = function(testing) {
  _ = nrequire('/support/underscore');
  nrequire('/ui/proxies');
  nrequire('/ui/style');
  Application = nrequire('/windows/application');
  Application.open();
  subscribePushNotifications();
};
