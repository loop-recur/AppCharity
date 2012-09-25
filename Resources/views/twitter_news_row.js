Views.TwitterNewsRow = function(news) {
  var self = {
    row: UI.createTableViewRow({
      created: Date.parse(news.created_at),
      backgroundColor: 'transparent',
      news: news,
      layout: 'horizontal',
      kind: "twitter"
    }),

    photo: UI.createImageView({
      image: news.user.profile_image_url,
      top: 0,
      left: 15,
      width: 60,
      height: 80,
      square: true
    }),
    
    content_view: UI.createView({
      layout: 'vertical',
      top: 10,
      left: 10,
      height: Ti.UI.SIZE
    }),

    title_view: UI.createView({
      layout: 'horizontal',
      height: Ti.UI.SIZE
    }),

    title: UI.createLabel({
      text: news.user.name,
      height: Ti.UI.SIZE
    }),

    screen_name: UI.createLabel({
      text: "@"+news.user.screen_name,
      color: '#ccc',
      height: Ti.UI.SIZE
    }),

    date: UI.createLabel({
      text: news.created_at,
      height: Ti.UI.SIZE
    }),

    text: UI.createLabel({
      text: news.text,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    }),
    
    twitter_actions: Views.TwitterActions(news)
  }

  self.title_view.add(self.title);
  self.title_view.add(self.date);

  self.content_view.add(self.title_view);
  self.content_view.add(self.screen_name);
  self.content_view.add(self.text);
  self.content_view.add(self.twitter_actions.view);

  self.row.add(self.photo);
  self.row.add(self.content_view);
  
  return self;
}
