var render = function(event) {
  var topBanner = nrequire('/templates/views/top_banner'),
      Detail = nrequire('/templates/views/event_detail'),
      BackButton = nrequire('/ui/back_button'),
      BorderShadows = nrequire('/ui/border_shadows');

  var self = {
        win: UI.createWindow({
          navBarHidden: true,
          backgroundColor: "#f5f1f1"
        }),

        donate_banner: topBanner.render().view,

        shadow: BorderShadows({
          top: 100
        }).view,

        detail_view: Detail.render(event)
      };

  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  
  if(!isAndroid) {
    self.back_btn = BackButton(self.win);
    self.win.add(self.back_btn);
  }

  self.win.add(self.detail_view.view);

  return self;
};

module.exports = {render: render};
