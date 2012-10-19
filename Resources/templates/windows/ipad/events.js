var render = function() {
  var topBanner = nrequire('/templates/views/top_banner'),
      Controller = nrequire('/templates/controllers/events'),
      SplitView = nrequire('/ui/split_view'),
      BorderShadows = nrequire('/ui/border_shadows');

  var self = {
        win: UI.createWindow({
          navBarHidden: true,
          backgroundImage: '/images/backgrounds/main_bg.png',
          backgroundRepeat: true
        }),
        
        split_view: SplitView(),

        donate_banner: topBanner.render().view,

        shadow: BorderShadows({ top: 100 }).view,

        table: UI.createTableView({
          top: 100,
          backgroundColor: "transparent",
          style_id: 'list_table'
        })
      };

  self.win.add(self.shadow);
  self.split_view.open();
  self.win.add(self.split_view);
  self.win.add(self.donate_banner);
  self.split_view.detailView.add(self.shadow);
  self.split_view.masterView.add(self.table);

  Controller(self);
  return self;
};

module.exports = {render: render};
