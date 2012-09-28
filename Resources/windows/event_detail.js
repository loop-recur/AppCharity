Windows.EventDetail = function(event) {
  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),

    donate_banner: Views.TopBanner().view,

    shadow: UI.BorderShadows({
      top: 100
    }).view,

    view: UI.createView({
      top: 100,
      height: Ti.UI.FILL,
      backgroundColor: 'transparent',
      layout: 'horizontal'
    }),

    cal_icon: UI.createImageView({
      image: '/images/icons/events_calendar.png',
      height: 60,
      width: 50,
      left: 10,
      top: 15,
      square: true
    }),

    month: UI.createLabel(merge(Style.h3, {
      text: 'Oct',
      top: 2,
      height: Ti.UI.SIZE,
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 6,
        fontWeight: 'bold'
      }
    })),

    day: UI.createLabel({
      text: '31',
      top: 13,
      height: Ti.UI.SIZE,
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 30,
        fontWeight: 'bold'
      }
    }),

    content_view: UI.createScrollView({
      layout: 'vertical',
      left: 10,
      right: 10,
      top: 15,
      height: Ti.UI.SIZE,
      width: 235
    }),

    title: UI.createLabel(merge(Style.h3, {
      left: 0,
      color: 'blue',
      text: event.name,
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    })),

    time: UI.createLabel(merge(Style.p3, {
      top: 5,
      left: 0,
      text: Date(event.start_time).slice(0, 15),
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),

    image: UI.createImageView({
      image: event.pic_big,
      height: 120
    }),

    location: UI.createLabel(merge(Style.p3, {
      top: 5,
      left: 0,
      text: event.location,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),

    description: UI.createLabel(merge(Style.p3, {
      top: 5,
      text: event.description,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE,
      bottom: 10
    }))
  };

  log(JSON.stringify(event));

  self.content_view.add(self.title);
  self.content_view.add(self.time);
  self.content_view.add(self.image);
  self.content_view.add(self.location);
  self.content_view.add(self.description);

  self.cal_icon.add(self.month);
  self.cal_icon.add(self.day);

  self.view.add(self.cal_icon);
  self.view.add(self.content_view);

  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  self.win.add(self.view);

  Controllers.EventDetail(self);
  return self;
};
