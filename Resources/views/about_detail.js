Views.AboutDetail = function(page) {
  var self = {
    view: UI.createScrollView({
      height: Ti.UI.FILL,
      backgroundColor: 'transparent',
      layout: 'vertical'
    }),

    title: UI.createLabel(merge(Style.h1, {
      text: 'About Us',
      top: 20,
      left: 20,
      height: Ti.UI.SIZE
    })),

    profile_view: UI.createView({
      layout: 'horizontal',
      top: 10,
      left: 20,
      right: 20,
      width: Ti.UI.FILL,
      height: 130
    }),

    photo: UI.createImageView({
      image: page.cover.source,
      borderColor: '#fff',
      borderRadius: 0,
      borderWidth: 5,
      top: 0,
      left: 0,
      width: 150,
      height: 110,
      square: true
    }),

    share_view: UI.createView({
      layout: 'vertical',
      left: 10,
      height: Ti.UI.SIZE,
      width: Ti.UI.FILL
    }),

    tweet_button: UI.createButton({
      width: 103,
      height: 37,
      square: true,
      backgroundImage: '/images/buttons/about_mobile_twitter_share_btn.png',
      backgroundSelectedImage: '/images/buttons/about_mobile_twitter_share_btn_p.png'
    }),

    fb_button: UI.createButton({
      top: 10,
      width: 103,
      height: 37,
      square: true,
      backgroundImage: '/images/buttons/about_mobile_fb_share_btn.png',
      backgroundSelectedImage: '/images/buttons/about_mobile_fb_share_btn_p.png'
    }),

    overview: UI.createLabel(merge(Style.p3, {
      left: 20,
      right: 20,
      text: page.company_overview
    })),

    about: UI.createLabel(merge(Style.p3, {
      top: 20,
      left: 20,
      right: 20,
      text: page.about
    })),

    mission: UI.createLabel(merge(Style.p3, {
      top: 20,
      left: 20,
      right: 20,
      text: page.mission
    }))
  };

  self.view.add(self.title);

  self.profile_view.add(self.photo);
  self.share_view.add(self.tweet_button);
  self.share_view.add(self.fb_button);
  self.profile_view.add(self.share_view);
  self.view.add(self.profile_view);

  self.view.add(self.overview);
  self.view.add(self.about);
  self.view.add(self.mission);

  Controllers.AboutDetail(self, page);

  return self;
};
