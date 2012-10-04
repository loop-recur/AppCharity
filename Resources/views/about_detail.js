Views.AboutDetail = function() {
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
      left: 10,
      right: 20,
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE
    }),
    
    photo_container: UI.createView({
      left: 0,
      width: 173,
      height: 124,
      backgroundImage: "/images/backgrounds/about_mobile_featured_img_bg.png",
      style_id: 'about_photo_container'
    }),

    photo: UI.createImageView({
      height: "85%",
      top: 4,
      style_id: 'about_photo'
    }),

    share_view: UI.createView({
      layout: 'vertical',
      left: 10,
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    }),

    tweet_button: UI.createButton({
      width: 103,
      height: 37,
      square: true,
      backgroundImage: '/images/buttons/about_mobile_twitter_share_btn.png',
      backgroundSelectedImage: '/images/buttons/about_mobile_twitter_share_btn_p.png',
      style_id: 'twitter_share_button'
    }),

    fb_button: UI.createButton({
      top: 10,
      width: 103,
      height: 37,
      square: true,
      backgroundImage: '/images/buttons/about_mobile_fb_share_btn.png',
      backgroundSelectedImage: '/images/buttons/about_mobile_fb_share_btn_p.png',
      style_id: 'fb_share_button'
    }),

    content: UI.createLabel(merge(Style.p3, {
      left: 20,
      right: 20
    }))
  };

  self.view.add(self.title);

  self.photo_container.add(self.photo);
  self.profile_view.add(self.photo_container)
  self.share_view.add(self.tweet_button);
  self.share_view.add(self.fb_button);
  self.profile_view.add(self.share_view);
  self.view.add(self.profile_view);

  self.view.add(self.content);

  Controllers.AboutDetail(self);

  return self;
};
