var UI = require("/ui/proxies")
, Style = require('/ui/style')
, _ = require('/support/underscore');

module.exports = function(news) {
  var self = {
    row: UI.createTableViewRow({
      created: new Date(news.created_time),
      news: news,
      backgroundColor: 'transparent',
      layout: 'vertical',
      kind: 'fb'
    }),

    header_view: UI.createView({
      layout: 'horizontal',
      top: 10,
      height: Ti.UI.SIZE,
      width: Ti.UI.FILL
    }),

    photo: UI.createImageView({
      image: news.picture,
      top: 0,
      left: 10,
      width: 60,
      height: 80,
      square: true
    }),

    title_view: UI.createView({
      layout: 'vertical',
      top: 10,
      left: 10,
      right: 10,
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE
    }),

    title: UI.createLabel(_.extend(Style.h3, {
      text: (news.name ? news.name : news.from.name),
      color: 'blue',
      left: 0,
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    })),

    time_and_place: UI.createView({
      layout: 'horizontal',
      left: 0,
      width: Ti.UI.FILL,
      height: Ti.UI.SIZE
    }),

    time: UI.createLabel(_.extend(Style.p3, {
      text: Date(news.created_time).slice(0, 10),
      color: '#505050',
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

    via: UI.createLabel(_.extend(Style.p3, {
      text: 'via',
      color: '#505050',
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

    description: UI.createLabel(_.extend(Style.p3, {
      text: news.description,
      left: 10,
      right: 10,
      bottom: 10,
      height: Ti.UI.SIZE,
      width: Ti.UI.FILL
    }))
  };

  self.title_view.add(self.title);
  self.time_and_place.add(self.time);
  self.time_and_place.add(self.world);
  self.time_and_place.add(self.via);
  self.time_and_place.add(self.fb_icon);
  self.title_view.add(self.time_and_place);

  self.header_view.add(self.photo);
  self.header_view.add(self.title_view);

  self.row.add(self.header_view);
  self.row.add(self.description);
   
  return self;
};
