Views.TwitterNewsRow = function(news) {
  var self = {
    row: UI.createTableViewRow({
      created: DateFormatter.date(news.created_at, {parsed: true}),
      backgroundColor: 'transparent',
      news: news,
      layout: 'horizontal',
      className: "twitter_row"
    }),

    photo: UI.createImageView({
      image: news.user.profile_image_url,
      top: 10,
      left: 10,
      width: 60,
      height: 60,
      square: true
    }),
    
    content_view: UI.createView({
      layout: 'vertical',
      top: 10,
      left: 10,
      right: 10,
      height: Ti.UI.SIZE,
      width: '70%'
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
      text: DateFormatter.date(news.created_at, {formatted: true}),
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

  self.title_view.add(self.screen_name);
  self.title_view.add(self.date);

  self.content_view.add(self.title);
  self.content_view.add(self.title_view);
  self.content_view.add(self.tweet);
  self.content_view.add(self.twitter_actions.view);

  self.row.add(self.photo);
  self.row.add(self.content_view);
  
  return self;
};
