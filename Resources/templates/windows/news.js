var topBanner = nrequire('templates/views/top_banner')
  , Controller = nrequire('templates/controllers/news')
  , BorderShadows = nrequire('/ui/border_shadows');

module.exports.render = function() {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),

    donate_banner: topBanner.render().view,

    shadow: BorderShadows({
      top: 100
    }).view,

    table: UI.createTableView({
      top: 100,
      backgroundColor: 'transparent'
    })
  };
  
  self.table.separatorColor = isAndroid ? '#999' : 'rgba(183,183,183,.5)';
  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  self.win.add(self.table);

  Controller(self);

  return self;
};
