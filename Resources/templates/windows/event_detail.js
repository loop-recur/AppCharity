var topBanner = nrequire('templates/views/top_banner'),
    Controller = nrequire('templates/controllers/event_detail'),
    Detail = nrequire('templates/views/event_detail');

module.exports.render = function(event) {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundColor: "#f5f1f1"
    }),

    donate_banner: topBanner.render().view,

    shadow: UI.BorderShadows({
      top: 100
    }).view,

    back_btn: UI.createButton({
      backgroundImage: '/images/buttons/big_back.png',
      backgroundSelectedImage: '/images/buttons/big_back_p.png',
      height: 36,
      width: 302,
      zIndex: 25,
      top: 110
    }),

    detail_view: Detail.render(event)
  };

  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  if(!isAndroid) { self.win.add(self.back_btn); }
  self.win.add(self.detail_view.view);

  Controller(self);
  return self;
};

