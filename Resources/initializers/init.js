Controllers = {};
Models = {};
Views = {};
UI = {};
Windows = {};
_ = null;


exports.init = function(r) {
  if(r) require = r;
  
  _ = require('/support/underscore');

  require('/lib/scaler');
  require('/lib/fb_graph');
  require('/lib/property_cache');
  require('/lib/jsOAuth-1.3.1');
  require('/lib/twitter');

  require('/ui/proxies');
  require('/ui/style');
  require('/ui/spinner');

  require('/controllers/events');
  require('/controllers/news');
  require('/controllers/about');
  require('/controllers/about_detail');
  require('/controllers/photo_gallery');
  require('/controllers/twitter_actions');
  require('/controllers/event_detail');

  require('/views/about_detail');
  require('/views/event_row');
  require('/views/twitter_actions');
  require('/views/fb_news_row');
  require('/views/twitter_news_row');
  require('/views/top_banner');

  require('/windows/fb_news_detail');
  require('/windows/event_detail');
  require('/windows/twitter_news_detail');
  require('/windows/events');
  require('/windows/news');
  require('/windows/about');
  require('/windows/photo_gallery');
  require('/windows/application');
}
