Views.TwitterNewsRow = function(news) {
  var self = {
    row: UI.createTableViewRow({
      created: DateFormatter.date(news.created_at, {parsed: true}),
      backgroundColor: 'transparent',
      news: news,
      className: 'twitter'
    }),

    photo: UI.createImageView({
      image: news.user.profile_image_url,
      top: 10,
      left: 10,
      width: 40,
      height: 40,
      square: true
    }),
    
    content_view: UI.createView({
      layout: 'vertical',
      top: 10,
      left: 60,
      right: 10,
      height: Ti.UI.SIZE,
      style_id: 'news_container'
    }),

    title_view: UI.createView({
      height: Ti.UI.SIZE,
      layout: 'horizontal'
    }),

    title: UI.createLabel(merge(Style.h2, {
      text: news.user.name,
      left: 0
    })),

    screen_name: UI.createLabel(merge(Style.p3, {
      text: "@"+news.user.screen_name,
      left: 5,
      width: 55,
      height: 15,
      ellipsize: true
    })),

    date: UI.createLabel(merge(Style.p3, {
      text: DateFormatter.date(news.created_at, {twitter_row: true}),
      left: 10,
      right: 0
    })),

    tweet: UI.createLabel(merge(Style.p3, {
      text: news.text,
      top: 5,
      left: 0,
      width: Ti.UI.FILL
    })),
    
    twitter_actions: Views.TwitterActions(news)
  };

  self.title_view.add(self.title);
  self.title_view.add(self.screen_name);
  self.title_view.add(self.date);

  self.content_view.add(self.title_view);
  self.content_view.add(self.tweet);
  self.content_view.add(self.twitter_actions.view);

  self.row.add(self.photo);
  self.row.add(self.content_view);
  
  if(isIPad) {
    self.photo.top = 25;
    self.tweet.width = "70%";
    var tweet_btn = self.twitter_actions.tweet_button;
    self.twitter_actions.view.remove(tweet_btn);
    tweet_btn.left = null;
    tweet_btn.right = 100;
    self.row.add(tweet_btn);
    self.row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
  }
  
  return self;
};
