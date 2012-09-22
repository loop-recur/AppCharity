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
      height: 80
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

    twitter_view: UI.createView({
      layout: 'horizontal'
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
    
    reply: UI.createImageView({
      height: 17,
      width: 26,
      backgroundImage: '/images/icons/twitter_respond.png',
      backgroundSelectedImage: '/images/icons/twitter_respond_p.png'
    }),

    fav: UI.createImageView({
      height: 22,
      width: 21,
      backgroundImage: '/images/icons/twitter_fav.png',
      backgroundSelectedImage: '/images/icons/twitter_fav_p.png'
    }),

    retweet: UI.createImageView({
      height: 15,
      width: 26,
      backgroundImage: '/images/icons/twitter_retweet.png',
      backgroundSelectedImage: '/images/icons/twitter_retweet_p.png'
    }),

    tweet_button: UI.createButton({
      title: "tweet"
    })
  }

  self.title_view.add(self.title);
  self.title_view.add(self.date);

  self.twitter_view.add(self.reply);
  self.twitter_view.add(self.fav);
  self.twitter_view.add(self.retweet);
  self.twitter_view.add(self.tweet_button);

  self.content_view.add(self.title_view);
  self.content_view.add(self.screen_name);
  self.content_view.add(self.text);
  self.content_view.add(self.twitter_view);

  self.row.add(self.photo);
  self.row.add(self.content_view);

  return self;
}
