Windows.FbNewsDetail = function(news) {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),

    donate_banner: Views.TopBanner().view,

    shadow: UI.BorderShadows({
      top: 100
    }).view,

    view: UI.createScrollView({
      top: 100,
      backgroundColor: 'transparent',
      layout: 'vertical'
    }),

    header_view: UI.createView({
      layout: 'horizontal',
      top: 10,
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
      width: Ti.UI.SIZE,
      height: 220 
    }),

    title: UI.createLabel(merge(Style.h3, {
      text: (news.name ? news.name : news.from.name),
      color: 'blue',
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
      top: 10,
      bottom: 10,
      height: Ti.UI.SIZE
    })),

    description: UI.createLabel(merge(Style.p3, {
      text: news.description,
      left: 10,
      right: 10,
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

  self.header_view.add(self.photo);
  self.header_view.add(self.title_view);

  self.view.add(self.header_view);
  self.view.add(self.message);
  self.view.add(self.description);

  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  self.win.add(self.view);

  return self;
};
