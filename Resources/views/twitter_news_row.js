Views.TwitterNewsRow = function(news) {
  var self = {
    row: UI.createTableViewRow({
      created: new Date(news.created_at),
      news: news,
      kind: "twitter"
    }),
    
    content_view: UI.createView({
      layout: 'vertical',
      height: Ti.UI.SIZE
    }),
    
    photo: UI.createImageView({
      image: news.user.profile_image_url,
      top: 0,
      left: 5,
      width: 60,
      height: 80
    }),

    title_view: UI.createView({
      layout: 'horizontal',
      left: 80,
      height: Ti.UI.SIZE
    }),

    title: UI.createLabel({
      text: news.user.name,
      color: 'blue',
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
  self.title_view.add(self.screen_name);
  self.title_view.add(self.date);

  self.row.add(self.photo);

  self.content_view.add(self.title_view);
  self.content_view.add(self.text);
  self.content_view.add(self.twitter_actions.view);
  self.row.add(self.content_view);
  
  return self;
}
