Ti.UI.setBackgroundColor('#FFF');

isAndroid = Ti.Platform.osname == 'android';
isIPad = Ti.Platform.osname == 'ipad';
isIPhone = Ti.Platform.osname == 'iphone';
isMobileweb = Ti.Platform.osname == 'mobileweb';

Ti.Facebook.appid = "299031140162997";
Ti.Facebook.permissions = ['publish_stream', 'read_stream', 'offline_access'];

// require('./initializers/init').init();
ApplicationWindow = require("/windows/application");
// PropertyCache = require("/lib/property_cache");
// 
// PropertyCache.setup({cache_time: 120000});
// Twitter.setup({consumerKey: "CgIDnN8kDKPu1uKhMK5Qg", consumerSecret: "AULwvohyIehfXfPUaKAaEifYRtzlDuOIo80qHQVRnyI"});
ApplicationWindow.open();