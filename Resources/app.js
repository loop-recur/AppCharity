Ti.UI.setBackgroundColor('#FFF');

Cloud = require('ti.cloud');

isAndroid = Ti.Platform.osname == 'android';
isIPad = Ti.Platform.osname == 'ipad';
isIPhone = Ti.Platform.osname == 'iphone';
isMobileweb = Ti.Platform.osname == 'mobileweb';

Ti.include("initializers/init.js");
init();

Ti.Facebook.appid = "299031140162997";
Ti.Facebook.permissions = ['publish_stream', 'read_stream', 'offline_access'];

PropertyCache.setup({cache_time: 300000});
Twitter.setup({consumerKey: "vmE9f6GtDLRYkh5aytSww", consumerSecret: "mQR4XfZGbQPyKoblElpXUF90fKzKSlWhR5me4ND0jEQ"});

Windows.Application.open();
