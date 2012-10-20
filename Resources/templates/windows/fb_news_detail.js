var render = function(news) {
  var topBanner = nrequire('/templates/views/top_banner'),
      BackButton = nrequire('/ui/back_button'),
      DateFormatter = nrequire('/lib/date_formatter'),
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

        view: UI.createScrollView({
          top: 100,
          left: "5%",
          right: "5%",
          backgroundColor: 'transparent',
          layout: 'vertical'
        }),

        header_view: UI.createView({
          layout: 'horizontal',
          top: (isAndroid ? 0 : 46),
          height: Ti.UI.SIZE,
          width: Ti.UI.FILL
        }),

        title_view: UI.createView({
          layout: 'vertical',
          top: 10,
          left: 10,
          right: 10,
          width: "85%",
          height: Ti.UI.SIZE
        }),

        title: UI.createLabel({
          text: (news.name ? news.name : news.from.name),
          color: '#667dad',
          left: 0,
          height: Ti.UI.SIZE,
          width: Ti.UI.SIZE,
          style_id: 'h3'
        }),

        time_and_place: UI.createView({
          layout: 'horizontal',
          left: 0,
          width: Ti.UI.FILL,
          height: Ti.UI.SIZE
        }),

        time: UI.createLabel({
          text: DateFormatter.date(news.created_time, {formatted: true, fb: true}),
          color: '#505050',
          left: 0,
          width: Ti.UI.SIZE,
          height: Ti.UI.SIZE,
          style_id: 'p3'
        }),

        world: UI.createImageView({
          image: '/images/icons/fb_public_icon.png',
          width: 13,
          height: 13,
          left: 2,
          square: true
        }),

        via: UI.createLabel({
          text: 'via',
          color: '#505050',
          left: 2,
          width: Ti.UI.SIZE,
          height: Ti.UI.SIZE,
          style_id: 'p3'
        }),

        fb_icon: UI.createImageView({
          image: '/images/icons/fb_small_icon.png',
          left: 4,
          width: 13,
          height: 13,
          square: true
        }),

        message: UI.createLabel({
          text: news.message,
          left: 10,
          right: 10,
          color: 'black',
          top: 10,
          bottom: 10,
          height: Ti.UI.SIZE,
          style_id: 'p3'
        }),

        description: UI.createLabel({
          text: news.description,
          left: 10,
          right: 10,
          color: 'black',
          height: Ti.UI.SIZE,
          width: Ti.UI.FILL,
          style_id: 'p3'
        })
      };

  self.title_view.add(self.title);
  self.time_and_place.add(self.time);
  self.time_and_place.add(self.world);
  self.time_and_place.add(self.via);
  self.time_and_place.add(self.fb_icon);
  self.title_view.add(self.time_and_place);
  self.header_view.add(self.title_view);
  self.view.add(self.header_view);
  self.view.add(self.message);
  self.view.add(self.description);
  self.win.add(self.donate_banner);
  self.win.add(self.shadow);

  if(!isAndroid) {
    self.back_btn = BackButton(self.win);
    self.win.add(self.back_btn);
  }

  self.win.add(self.view);

  return self;
};

module.exports = {render: render};
