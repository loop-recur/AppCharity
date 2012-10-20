var render = function() {
  var topBanner = nrequire('/templates/views/top_banner'),
      Controller = nrequire('/templates/controllers/events'),
      BorderShadows = nrequire('/ui/border_shadows');
  
  var self = {
        win: UI.createWindow({
          navBarHidden: true,
          backgroundImage: '/images/backgrounds/main_bg.png',
          backgroundRepeat: true
        }),

        donate_banner: topBanner.render().view,

        shadow: BorderShadows({ top: 100 }).view,

        table: UI.createTableView({
          top: 100,
          backgroundColor: 'transparent',
          style_id: 'list_table'
        })
      };
      
  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  self.win.add(self.table);
  
  Controller(self);
  return self;
};

module.exports = {render: render};
