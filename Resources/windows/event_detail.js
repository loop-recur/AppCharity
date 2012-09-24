Windows.EventDetail = function(event) {
  var self = {
    win: UI.createWindow(),

    cal_icon: UI.createImageView({
      image: '/images/icons/events_calendar.png',
      height: 41,
      width: 41,
      square: true
    }),

    month: UI.createLabel(merge(Style.h2, {
      text: 'Oct'
    })),

    day: UI.createLabel({
      text: '31',
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 32,
        fontWeight: 'bold'
      }
    }),

    content_view: UI.createView({
      layout: 'vertical',
      left: 80,
      height: Ti.UI.SIZE
    }),
    
    title: UI.createLabel(merge(Style.h1, {
      text: event.name,
      color: 'blue',
      height: Ti.UI.SIZE
    })),
    
    time: UI.createLabel(merge(Style.p3, {
      text: new Date(event.start_time),
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),
    
    location: UI.createLabel(merge(Style.p2, {
      text: event.location,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),
    
    description: UI.createLabel(merge(Style.p2, {
      text: event.description,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    }))
  };

  }
  
  self.content_view.add(self.title);
  self.content_view.add(self.time);
  self.content_view.add(self.location);
  self.content_view.add(self.description);

  self.cal_icon.add(self.month);
  self.cal_icon.add(self.day);

  self.win.add(self.cal_icon);
  self.win.add(self.right_view);
  
  Controller.EventDetail(self);

  return self;
}
