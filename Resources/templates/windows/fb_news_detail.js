var topBanner = nrequire('templates/views/top_banner'),
    Controller = nrequire('templates/controllers/fb_news_detail');

module.exports.render = function(news) {
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

    photo: UI.createImageView({
      image: news.picture,
      top: 0,
      left: 10,
      width: 60,
      height: 60,
      square: true
    }),

    title_view: UI.createView({
      layout: 'vertical',
      top: 10,
      left: 10,
      right: 10,
      width: "85%",
      height: Ti.UI.SIZE
    }),

    title: UI.createLabel(merge(Style.h3, {
      text: (news.name ? news.name : news.from.name),
      color: '#667dad',
      left: 0,
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    })),

    time_and_place: UI.createView({
      layout: 'horizontal',
      left: 0,
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE
    }),

    time: UI.createLabel(merge(Style.p3, {
      text: DateFormatter.date(news.created_time, {formatted: true, fb: true}),
      color: '#505050',
      left: 0,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),

    world: UI.createImageView({
      image: '/images/icons/fb_public_icon.png',
      width: 13,
      height: 13,
      left: 2,
      square: true
    }),

    via: UI.createLabel(merge(Style.p3, {
      text: 'via',
      color: '#505050',
      left: 2,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),

    fb_icon: UI.createImageView({
      image: '/images/icons/fb_small_icon.png',
      left: 4,
      width: 13,
      height: 13,
      square: true
    }),

    message: UI.createLabel(merge(Style.p3, {
      text: news.message,
      left: 10,
      right: 10,
      color: 'black',
      top: 10,
      bottom: 10,
      height: Ti.UI.SIZE
    })),

    description: UI.createLabel(merge(Style.p3, {
      text: news.description,
      left: 10,
      right: 10,
      color: 'black',
      height: Ti.UI.SIZE,
      width: Ti.UI.FILL
    }))
  };

  self.title_view.add(self.title);
  self.time_and_place.add(self.time);
  self.time_and_place.add(self.world);
  self.time_and_place.add(self.via);
  self.time_and_place.add(self.fb_icon);
  self.title_view.add(self.time_and_place);

  // if(news.picture) { self.header_view.add(self.photo); }
  self.header_view.add(self.title_view);

  self.view.add(self.header_view);
  self.view.add(self.message);
  self.view.add(self.description);

  self.win.add(self.donate_banner);
  self.win.add(self.shadow);

  if(isIPad){
    self.back_btn.top = 20;
    self.back_btn.left = 0;
    self.view.add(self.back_btn);
  } else if(isIPhone) {
    self.win.add(self.back_btn);
  }

  self.win.add(self.view);

  Controller(self);

  return self;
};

