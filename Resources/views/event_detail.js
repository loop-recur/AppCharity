Views.EventDetail = function(event) {
  var self = {
    view: UI.createScrollView({
      top: 100,
      contentHeight: 'auto',
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

    content_view: UI.createView({
      layout: 'vertical',
      left: 10,
      right: 10,
      top: 15,
      height: Ti.UI.SIZE,
      width: "85%"
    }),

    title: UI.createLabel(merge(Style.h3, {
      left: 0,
      color: '#667dad',
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

  self.content_view.add(self.title);
  self.content_view.add(self.time);
  self.content_view.add(self.image);
  self.content_view.add(self.location);
  self.content_view.add(self.description);

  self.cal_icon.add(self.month);
  self.cal_icon.add(self.day);

  self.view.add(self.cal_icon);
  self.view.add(self.content_view);

  return self;
};
