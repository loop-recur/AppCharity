var UI = require("/ui/proxies")
, NewsController = require("/controllers/news")
, TopBanner = require("/views/top_banner");

module.exports = function() {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),

    donate_banner: TopBanner().view,

    top_shadow: UI.createView({
      top: 100,
      width: Ti.UI.FILL,
      height: 20,
      backgroundImage: '/images/shadow/screen_shadow_top.png'
    }),

    side_shadow: UI.createView({
      top: 120,
      bottom: 20,
      backgroundImage: '/images/shadow/screen_shadow_sides_repeat.png',
      width: Ti.UI.FILL,
      height: Ti.UI.FILL
    }),

    bottom_shadow: UI.createView({
      bottom: 0,
      width: Ti.UI.FILL,
      height: 20,
      backgroundImage: '/images/shadow/screen_shadow_bottom.png'
    }),

    table: UI.createTableView({
      top: 100,
      backgroundColor: 'transparent'
    })
  };

  self.win.add(self.donate_banner);
  self.win.add(self.top_shadow);
  self.win.add(self.side_shadow);
  self.win.add(self.bottom_shadow);
  self.win.add(self.table);

  NewsController(self);

  return self;
};
