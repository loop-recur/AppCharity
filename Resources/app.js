Ti.UI.setBackgroundColor('#FFF');

Cloud = require('./commonjs/ti.cloud/2.3.0/ti.cloud');


isAndroid = Ti.Platform.osname == 'android';
isIPad = Ti.Platform.osname == 'ipad';
isIPhone = Ti.Platform.osname == 'iphone';
isMobileweb = Ti.Platform.osname == 'mobileweb';
Ti.Facebook.appid = "299031140162997";
Ti.Facebook.permissions = ['publish_stream', 'read_stream', 'offline_access'];
Ti.include("initializers/init.js");
init();

PropertyCache.setup({cache_time: 120000});
Twitter.setup({consumerKey: "CgIDnN8kDKPu1uKhMK5Qg", consumerSecret: "AULwvohyIehfXfPUaKAaEifYRtzlDuOIo80qHQVRnyI"});

Windows.Application.open();
