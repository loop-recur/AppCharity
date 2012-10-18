var render = function(news) {
  var topBanner = nrequire('/templates/views/top_banner'),
      Controller = nrequire('/templates/controllers/twitter_news_detail'),
      TwitterActions = nrequire('/templates/views/twitter_actions'),
      BorderShadows = nrequire('/ui/border_shadows'),
      DateFormatter = nrequire('/lib/date_formatter');
  
    var self = {
      win: UI.createWindow({
        navBarHidden: true,
        backgroundColor: "#f5f1f1"
      }),

      donate_banner: topBanner.render().view,

      shadow: BorderShadows({
        top: 100
      }).view,

      back_btn: UI.createButton({
        backgroundImage: '/images/buttons/big_back.png',
        backgroundSelectedImage: '/images/buttons/big_back_p.png',
        height: 36,
        width: 302,
        zIndex: 25,
        top: 110
      }),

      view: UI.createView({
        top: (isAndroid ? 100 : 146),
        left: 10,
        right: 10,
        backgroundColor: 'transparent',
        layout: 'horizontal'
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
        left: "5%",
        right: "5%",
        height: Ti.UI.SIZE,
        width: "85%"
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
        text: DateFormatter.date(news.created_at, {twitter: true}),
        color: '#505050',
        right: 0
      })),

      tweet: UI.createLabel(_.extend(Style.p3, {
        text: news.text,
        top: 5,
        width: Ti.UI.FILL
      })),
    
      twitter_actions: TwitterActions.render(news)
    };

    self.title_view.add(self.screen_name);
    self.title_view.add(self.date);

    self.content_view.add(self.title);
    self.content_view.add(self.title_view);
    self.content_view.add(self.tweet);
  
    self.twitter_actions.view.top = 15;
    self.content_view.add(self.twitter_actions.view);

    // self.view.add(self.photo);
    self.view.add(self.content_view);
  
    self.win.add(self.donate_banner);
    self.win.add(self.shadow);
  
    if(isIPad){
      self.back_btn.top = 20;
      self.back_btn.left = "5%";
      self.view.add(self.back_btn);
    } else if(isIPhone) {
      self.win.add(self.back_btn);
    }
    self.win.add(self.view);

    Controller(self);

    return self;
};

module.exports = {render: render}
