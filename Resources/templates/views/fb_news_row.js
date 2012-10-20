var render = function(news) {
  var DateFormatter = nrequire('/lib/date_formatter'),
      fbButton = nrequire('/ui/fb_button');
  
  var self = {
        row: UI.createTableViewRow({
          created: DateFormatter.date(news.created_time, {parsed: true, fb: true}),
          news: news,
          backgroundColor: 'transparent',
          kind: news.kind,
          style_id: 'news_row',
          className: (news.picture ? 'facebook-pic' : 'facebook-nopic')
        }),
    
        container_view: UI.createView({
          layout: 'vertical',
          height: Ti.UI.SIZE,
          left: 10,
          top: 10,
          style_id: 'news_container'
        }),

        photo: UI.createImageView({
          image: (isAndroid ? '/images/icons/MSF-twitter-icon.png' : news.picture),
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          square: true,
          style_id: 'news_photo'
        }),
        
        top_view: UI.createView({ height: Ti.UI.SIZE, left:0, layout: 'horizontal'}),

        title_view: UI.createView({
          layout: 'vertical',
          top: 0,
          left: 0,
          right: 10,
          width: (news.picture ? "70%" : "100%"),
          height: Ti.UI.SIZE
        }),

        title: UI.createLabel({
          text: (news.name ? news.name : news.from.name),
          top: 0,
          left: 0,
          height: Ti.UI.SIZE,
          style_id: 'h4'
        }),

        time_and_place: UI.createView({
          layout: 'horizontal',
          top: 3,
          left: 0,
          width: Ti.UI.FILL,
          height: Ti.UI.SIZE
        }),

        time: UI.createLabel({
          text: DateFormatter.date(news.created_time, {formatted: true, fb: true}),
          left: 0,
          width: Ti.UI.SIZE,
          height: Ti.UI.SIZE,
          style_id: 'p3'
        }),

        world: UI.createImageView({
          image: '/images/icons/fb_public_icon.png',
          width: 13,
          height: 13,
          left: 2,
          square: true
        }),

        via: UI.createLabel({
          text: 'via',
          left: 2,
          width: Ti.UI.SIZE,
          height: Ti.UI.SIZE,
          style_id: 'p3'
        }),

        fb_icon: UI.createImageView({
          image: '/images/icons/fb_small_icon.png',
          left: 4,
          width: 13,
          height: 13,
          square: true
        }),

        description: UI.createLabel({
          text: news.description,
          top: 5,
          left: 0,
          right: 10,
          bottom: 10,
          height: Ti.UI.SIZE,
          width: Ti.UI.FILL,
          style_id: 'p3'
        })
      };

  self.title_view.add(self.title);
  self.time_and_place.add(self.time);
  self.time_and_place.add(self.world);
  self.time_and_place.add(self.via);
  self.time_and_place.add(self.fb_icon);
  self.title_view.add(self.time_and_place);

  if(isIPad) {
    self.description.width = "70%";
    self.container_view.add(self.title_view);
    self.row.add(self.photo);
    self.row.add(fbButton());
  } else {
    if(news.picture) { 
      self.top_view.add(self.photo);
      self.title_view.left = 10;
    }
    self.top_view.add(self.title_view);
    self.container_view.add(self.top_view);
  }
  
  self.container_view.add(self.description);
  self.row.add(self.container_view);
   
  return self;
};

module.exports = {render: render};
