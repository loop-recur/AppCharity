UI = {};

var subscribePushNotifications = function() {
  var channel = Ti.App.id;
  Push.subscribe(channel);
};

module.exports = function(testing) {
  nrequire('/support/functional');
  nrequire('/support/prelude');
  nrequire('/support/date');
  nrequire('/lib/scaler');
  nrequire('/lib/fb_graph');
  nrequire('/lib/jsOAuth-1.3.1');
  nrequire('/lib/property_cache');
  nrequire('/lib/twitter');
  nrequire('/lib/grid');
  nrequire('/lib/date_formatter');
  nrequire('/lib/push');
  nrequire('/ui/proxies');
  nrequire('/ui/split_view');
  nrequire('/ui/pull_to_refresh');
  nrequire('/ui/cropped_image');
  nrequire('/ui/confirm');
  nrequire('/ui/style');
  nrequire('/ui/spinner');
  nrequire('/ui/border_shadows');
  Application = nrequire('/windows/application');
  Application.open();
  subscribePushNotifications();
};
