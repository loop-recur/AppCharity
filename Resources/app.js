Ti.UI.setBackgroundColor('#FFF');

Cloud = require('./commonjs/ti.cloud/2.3.0/ti.cloud');

isAndroid = Ti.Platform.osname == 'android';
isIPhone = Ti.Platform.osname == 'iphone';
isMobileweb = Ti.Platform.osname == 'mobileweb';

Ti.Facebook.appid = "299031140162997";
Ti.Facebook.permissions = ['publish_stream', 'read_stream', 'offline_access'];
Ti.include("initializers/init.js");
init();

Windows.Application.open();
