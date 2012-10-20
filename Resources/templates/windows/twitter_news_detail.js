var render = function(news) {
  var topBanner = nrequire('/templates/views/top_banner'),
      TwitterActions = nrequire('/templates/views/twitter_actions'),
      BorderShadows = nrequire('/ui/border_shadows'),
      BackButton = nrequire('/ui/back_button'),
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

        title: UI.createLabel({
          text: news.user.name,
          left: 0,
          style_id: 'h2'
        }),

        screen_name: UI.createLabel({
          text: "@"+news.user.screen_name,
          color: '#505050',
          left: 0,
          style_id: 'p3'
        }),

        date: UI.createLabel({
          text: DateFormatter.date(news.created_at, {twitter: true}),
          color: '#505050',
          right: 0,
          style_id: 'p3'
        }),

        tweet: UI.createLabel({
          text: news.text,
          top: 5,
          width: Ti.UI.FILL,
          style_id: 'p3'
        }),
    
        twitter_actions: TwitterActions.render(news)
      };

  self.title_view.add(self.screen_name);
  self.title_view.add(self.date);
  self.content_view.add(self.title);
  self.content_view.add(self.title_view);
  self.content_view.add(self.tweet);
  self.twitter_actions.view.top = 15;
  self.content_view.add(self.twitter_actions.view);
  self.view.add(self.content_view);
  self.win.add(self.donate_banner);
  self.win.add(self.shadow);

  if(!isAndroid) {
    self.back_btn = BackButton(self.win);
    self.win.add(self.back_btn);
  }
  
  self.win.add(self.view);

  return self;
};

module.exports = {render: render};
