var DateFormatter = nrequire('/lib/date_formatter');

module.exports.render = function(news) {
  var self = {
    row: UI.createTableViewRow({
      created: DateFormatter.date(news.created_time, {parsed: true, fb: true}),
      news: news,
      backgroundColor: 'transparent',
      kind: 'fb',
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
      top: 10,
      left: 10,
      width: 40,
      height: 40,
      square: true
    }),

    title_view: UI.createView({
      layout: 'vertical',
      top: 0,
      left: 0,
      right: 10,
      width: (news.picture ? "70%" : "100%"),
      height: Ti.UI.SIZE
    }),

    title: UI.createLabel(merge(Style.h4, {
      text: (news.name ? news.name : news.from.name),
      top: 0,
      left: 0,
      height: Ti.UI.SIZE
    })),

    time_and_place: UI.createView({
      layout: 'horizontal',
      top: 3,
      left: 0,
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE
    }),

    time: UI.createLabel(merge(Style.p3, {
      text: DateFormatter.date(news.created_time, {formatted: true, fb: true}),
      left: 0,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),

    world: UI.createImageView({
      image: '/images/icons/fb_public_icon.png',
      width: 13,
      height: 13,
      left: 2,
      square: true
    }),

    via: UI.createLabel(merge(Style.p3, {
      text: 'via',
      left: 2,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),

    fb_icon: UI.createImageView({
      image: '/images/icons/fb_small_icon.png',
      left: 4,
      width: 13,
      height: 13,
      square: true
    }),

    description: UI.createLabel(merge(Style.p5, {
      text: news.description,
      top: 5,
      left: 0,
      right: 10,
      bottom: 10,
      height: Ti.UI.SIZE,
      width: Ti.UI.FILL
    }))
  };
  
  if(isIPad) {
    var fb_button = UI.createButton({
      height: 29,
      width: 56,
      right: 100,
      backgroundImage: '/images/buttons/go_to_fb_btn.png',
      backgroundSelectedImage: '/images/buttons/go_to_fb_btn_p.png',
      id: 'twitter_action'
    });
    self.description.width = "70%";
    self.row.add(fb_button);
    fb_button.addEventListener('click', function(){
      Ti.Platform.openURL('http://www.facebook.com/msf.english');
    });
  }

  self.title_view.add(self.title);
  self.time_and_place.add(self.time);
  self.time_and_place.add(self.world);
  self.time_and_place.add(self.via);
  self.time_and_place.add(self.fb_icon);
  self.title_view.add(self.time_and_place);


  if(isIPad) {
    self.photo.top = 25;
    self.container_view.add(self.title_view);
    self.container_view.add(self.description);
    self.row.add(self.photo);
    self.row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
  } else {
    var top_view = UI.createView({ height: Ti.UI.SIZE, left:0, layout: 'horizontal'});
    if(news.picture) { 
      top_view.add(self.photo);
      self.title_view.left = 10;
    }
    self.photo.left = 0;
    top_view.add(self.title_view);
    self.container_view.add(top_view);
    self.container_view.add(self.description);
  }
  
  self.row.add(self.container_view);
   
  return self;
};

