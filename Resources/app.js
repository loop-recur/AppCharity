Ti.UI.setBackgroundColor('#FFF');
isAndroid = Ti.Platform.osname == 'android';
isIPad = Ti.Platform.osname == 'ipad';
isIPhone = Ti.Platform.osname == 'iphone';
isMobileweb = Ti.Platform.osname == 'mobileweb';

Ti.include('/lib/nrequire.js');

Cloud = require('ti.cloud');

nrequire("/initializers/config");
nrequire("/initializers/init").init();
