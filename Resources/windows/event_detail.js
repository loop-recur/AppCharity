var UI = require("/ui/proxies")
, Style = require('/ui/style')
, EventDetailController = require("/controllers/event_detail")
, _ = require('/support/underscore');

module.exports = function(event) {
  var self = {
    win: UI.createWindow(),

    cal_icon: UI.createImageView({
      image: '/images/icons/events_calendar.png',
      height: 41,
      width: 41,
      square: true
    }),

    month: UI.createLabel(_.extend(Style.h2, {
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
    
    title: UI.createLabel(_.extend(Style.h1, {
      text: event.name,
      color: 'blue',
      height: Ti.UI.SIZE
    })),
    
    time: UI.createLabel(_.extend(Style.p3, {
      text: new Date(event.start_time),
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),
    
    location: UI.createLabel(_.extend(Style.p2, {
      text: event.location,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),
    
    description: UI.createLabel(_.extend(Style.p2, {
      text: event.description,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    }))
  };
  
  self.content_view.add(self.title);
  self.content_view.add(self.time);
  self.content_view.add(self.location);
  self.content_view.add(self.description);

  self.cal_icon.add(self.month);
  self.cal_icon.add(self.day);

  self.win.add(self.cal_icon);
  self.win.add(self.right_view);
  
  EventDetailController(self);

  return self;
};
