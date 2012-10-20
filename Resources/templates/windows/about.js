var render = function() {
  var topBanner = nrequire('/templates/views/top_banner'),
      Controller = nrequire('/templates/controllers/about'),
      Detail = nrequire('/templates/views/about_detail'),
      BorderShadows = nrequire('/ui/border_shadows');
    
  var self = {
        win: UI.createWindow({
          navBarHidden: true,
          backgroundImage: '/images/backgrounds/main_bg.png',
          backgroundRepeat: true
        }),

        vert_view: UI.createView({
          layout: 'vertical'
        }),

        donate_banner: topBanner.render().view,

        shadow: BorderShadows({top: 120}).view,

        subnav: UI.createView({
          top: 0,
          height: 120,
          width: "100%"
        }),

        detail_view: Detail.render()
      };

  if(isIPad) self.vert_view.add(self.donate_banner);
  
  self.vert_view.add(self.subnav);
  self.vert_view.add(self.detail_view.view);
  self.win.add(self.shadow);
  self.win.add(self.vert_view);

  Controller(self);
  return self;
};

module.exports = {render: render};
