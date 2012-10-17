Ti.UI.setBackgroundColor('#FFF');

isAndroid = Ti.Platform.osname == 'android';
isIPad = Ti.Platform.osname == 'ipad';
isIPhone = Ti.Platform.osname == 'iphone';
isMobileweb = Ti.Platform.osname == 'mobileweb';

if(isAndroid) module = {};
nrequire = function(path){
  if(isAndroid) {
    Ti.include(path+'.js');
    return module.exports;
  } else {
    return require(path);
  }
}

var Twitter = nrequire('lib/twitter');
Cloud = require('ti.cloud');

var init = nrequire("/initializers/init");
init();

Ti.Facebook.appid = "454480297929219";
Ti.Facebook.permissions = ['publish_stream', 'read_stream', 'offline_access'];

PropertyCache.setup({cache_time: 600000});
Twitter.setup({consumerKey: "vmE9f6GtDLRYkh5aytSww", consumerSecret: "mQR4XfZGbQPyKoblElpXUF90fKzKSlWhR5me4ND0jEQ"});

