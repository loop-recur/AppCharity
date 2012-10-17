UI = {};
Push = nrequire('/lib/push');

var subscribePushNotifications = function() {
  var channel = Ti.App.id;
  Push.subscribe(channel);
};

module.exports = function(testing) {
  nrequire('/support/functional');
  nrequire('/support/prelude');
  nrequire('/lib/property_cache');
  nrequire('/ui/proxies');
  nrequire('/ui/style');
  Application = nrequire('/windows/application');
  Application.open();
  subscribePushNotifications();
};
