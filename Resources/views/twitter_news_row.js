var UI = require("/ui/proxies")
, Style = require('/ui/style')
, _ = require('/support/underscore');

module.exports = function(news) {
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
      width: Ti.UI.SIZE
    }),

    title_view: UI.createView({
      height: Ti.UI.SIZE
    }),

    title: UI.createLabel(_.extend(Style.h2, {
      text: news.user.name,
      left: 0
    })),

    screen_name: UI.createLabel(_.extend(Style.p3, {
      text: "@"+news.user.screen_name,
      color: '#505050',
      left: 0
    })),

    date: UI.createLabel(_.extend(Style.p3, {
      text: news.created_at.slice(4, 10),
      color: '#505050',
      right: 0
    })),

    tweet: UI.createLabel(_.extend(Style.p3, {
      text: news.text,
      top: 5,
      width: Ti.UI.FILL
    })),
    
    twitter_actions: Views.TwitterActions(news)
  }

  self.title_view.add(self.screen_name);
  self.title_view.add(self.date);

  self.content_view.add(self.title);
  self.content_view.add(self.title_view);
  self.content_view.add(self.tweet);
  self.content_view.add(self.twitter_actions.view);

  self.row.add(self.photo);
  self.row.add(self.content_view);
  
  return self;
}
