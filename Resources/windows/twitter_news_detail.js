Windows.TwitterNewsDetail = function(news) {
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

    view: UI.createView({
      top: 100,
      backgroundColor: 'transparent',
      layout: 'horizontal'
    }),

    photo: UI.createImageView({
      image: news.user.profile_image_url,
      top: 10,
      left: 10,
      width: 60,
      height: 80,
      square: true
    }),
    
    content_view: UI.createView({
      layout: 'vertical',
      top: 10,
      left: 10,
      right: 10,
      height: Ti.UI.SIZE,
      width: 220
    }),

    title_view: UI.createView({
      height: Ti.UI.SIZE
    }),

    title: UI.createLabel(merge(Style.h2, {
      text: news.user.name,
      left: 0
    })),

    screen_name: UI.createLabel(merge(Style.p3, {
      text: "@"+news.user.screen_name,
      color: '#505050',
      left: 0
    })),

    date: UI.createLabel(merge(Style.p3, {
      text: news.created_at.slice(4, 10),
      color: '#505050',
      right: 0
    })),

    tweet: UI.createLabel(merge(Style.p3, {
      text: news.text,
      top: 5,
      width: Ti.UI.FILL
    })),
    
    twitter_actions: Views.TwitterActions(news)
  };

  log(JSON.stringify(news));

  self.title_view.add(self.screen_name);
  self.title_view.add(self.date);

  self.content_view.add(self.title);
  self.content_view.add(self.title_view);
  self.content_view.add(self.tweet);
  self.content_view.add(self.twitter_actions.view);

  self.view.add(self.photo);
  self.view.add(self.content_view);
  
  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  self.win.add(self.view);

  return self;
}