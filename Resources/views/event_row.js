Views.EventRow = function(event) {
  var self = {
    row: UI.createTableViewRow({
      start_time: new Date(event.start_time),
      layout: 'horizontal',
      event: event
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
      bottom: 10,
      height: Ti.UI.SIZE,
      width: 235
    }),

    title: UI.createLabel(merge(Style.h3, {
      text: event.name,
      color: 'blue',
      left: 0,
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    })),

    time: UI.createLabel(merge(Style.p3, {
      text: new Date(event.start_time),
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),

    location: UI.createLabel(merge(Style.p3, {
      text: event.location,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),

    description: UI.createLabel(merge(Style.p3, {
      text: event.description,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    }))
  };

  self.content_view.add(self.title);
  // self.content_view.add(self.time);
  // self.content_view.add(self.location);
  self.content_view.add(self.description);

  self.cal_icon.add(self.month);
  self.cal_icon.add(self.day);

  self.row.add(self.cal_icon);
  self.row.add(self.content_view);

  return self;
};
