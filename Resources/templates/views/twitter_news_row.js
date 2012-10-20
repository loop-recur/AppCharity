var render = function(news) {
  var TwitterActions = nrequire('/templates/views/twitter_actions'),
      DateFormatter = nrequire('/lib/date_formatter');
  
  var self = {
        row: UI.createTableViewRow({
          created: DateFormatter.date(news.created_at, {parsed: true}),
          backgroundColor: 'transparent',
          news: news,
          kind: news.kind,
          className: 'twitter',
          style_id: 'news_row'
        }),

        photo: UI.createImageView({
          image: news.user.profile_image_url,
          top: 10,
          left: 10,
          width: 40,
          height: 40,
          square: true,
          style_id: 'news_photo'
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

        title: UI.createLabel({
          text: news.user.name,
          left: 0,
          style_id: 'h4' 
        }),

        screen_name: UI.createLabel({
          text: "@"+news.user.screen_name,
          left: 5,
          width: 55,
          height: 15,
          ellipsize: true,
          style_id: 'p3'
        }),

        date: UI.createLabel({
          text: DateFormatter.date(news.created_at, {twitter_row: true}),
          left: 10,
          right: 0,
          style_id: 'p3'
        }),

        tweet: UI.createLabel({
          text: news.text,
          top: 5,
          left: 0,
          width: Ti.UI.FILL,
          style_id: 'p3'
        }),
    
        twitter_actions: TwitterActions.render(news)
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
    var tweet_btn = self.twitter_actions.tweet_button;
    self.twitter_actions.view.remove(tweet_btn);
    self.row.add(tweet_btn);
    self.tweet.width = "70%";
  }
  
  return self;
};

module.exports = {render: render};
