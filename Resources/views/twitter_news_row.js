Views.TwitterNewsRow = function(news) {
  var self = {
    row: UI.createTableViewRow({
      created: Date.parse(news.created_at),
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
    
    tweet_button: UI.createButton({
      title: "tweet"
    })
  }

  self.title_view.add(self.title);
  self.title_view.add(self.screen_name);
  self.title_view.add(self.date);

  self.row.add(self.photo);

  self.content_view.add(self.title_view);
  self.content_view.add(self.text);
  self.content_view.add(self.tweet_button);
  self.row.add(self.content_view);
  
  self.tweet_button.addEventListener('click', function(){
    var accessTokenKey = Ti.App.Properties.getString('twitterAccessTokenKey'),
           accessTokenSecret = Ti.App.Properties.getString('twitterAccessTokenSecret');
    
    var client = Twitter({consumerKey: "CgIDnN8kDKPu1uKhMK5Qg",
             consumerSecret: "AULwvohyIehfXfPUaKAaEifYRtzlDuOIo80qHQVRnyI",
             accessTokenKey:accessTokenKey,
             accessTokenSecret:accessTokenSecret
            });
            
    client.addEventListener('login', function(e) {
         if (e.success) {
           Ti.App.Properties.setString('twitterAccessTokenKey', e.accessTokenKey);
           Ti.App.Properties.setString('twitterAccessTokenSecret', e.accessTokenSecret);

           client.request("1/statuses/retweets/"+news.id+".json", {}, 'GET', function(e) {
             if (e.success) {
               log2("SUCCESS", e);
             } else  {
               log2("FAIL", e);
             }
           });
         } else {
           alert(e.error);
         }
       });
       
       client.authorize();
  });

  return self;
}
