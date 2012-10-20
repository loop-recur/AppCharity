log = function(x){ Ti.API.info(x); };
UI = {};
_ = null;
Push = nrequire('/lib/push');

var subscribePushNotifications = function() {
  var channel = Ti.App.id;
  Push.subscribe(channel);
};

var init = function(testing) {
  _ = nrequire('/support/underscore');
  nrequire('/ui/proxies');
  Application = nrequire('/windows/application');
  Application.open();
  subscribePushNotifications();
};

module.exports = {init: init};
