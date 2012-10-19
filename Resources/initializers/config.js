var PropertyCache = nrequire('/lib/property_cache'),
    Twitter = nrequire('/lib/twitter');

Ti.Facebook.appid = "454480297929219";
Ti.Facebook.permissions = ['publish_stream', 'read_stream', 'offline_access'];

PropertyCache.setup({cache_time: 600000});
Twitter.setup({consumerKey: "vmE9f6GtDLRYkh5aytSww", consumerSecret: "mQR4XfZGbQPyKoblElpXUF90fKzKSlWhR5me4ND0jEQ"});

ACS_ADMIN_CREDENTIALS = {login: 'appcharity', password: '123456'};
FB_PAGE = 'msf.english';
FB_ID = '33110852384';
TWITTER_SCREEN_NAME = 'MSF_USA';
