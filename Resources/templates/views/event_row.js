var render = function(event) {
  var DateFormatter = nrequire('/lib/date_formatter');
  
  var self = {
    row: UI.createTableViewRow({
      start_time: event.start_time,
      layout: 'horizontal',
      event: event,
      className: 'event'
    }),

    cal_icon: UI.createView({
      backgroundImage: '/images/icons/events_calendar.png',
      height: 55,
      width: 50,
      left: 10,
      top: 15,
      square: true,
      bottom: 15
    }),

    month: UI.createLabel({
      text: DateFormatter.date(event.start_time, {month: true}),
      top: 2,
      height: Ti.UI.SIZE,
			color:"#515151",
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 10
      }
    }),

    day: UI.createLabel({
      text: DateFormatter.date(event.start_time, {day: true}),
      top: 13,
      color: "black",
      height: Ti.UI.SIZE,
			color:"#515151",
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

    title: UI.createLabel(_.extend(Style.h3, {
      text: event.name,
      color: '#667dad',
      left: 0,
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    })),
    
    time: UI.createLabel(_.extend(Style.p3, {
      top: 5,
      left: 0,
      color: "#444444",
      text: DateFormatter.date(event.start_time, {to_date: true, formatted: true}),
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),
  };

  self.content_view.add(self.title);
  self.content_view.add(self.time);

  self.cal_icon.add(self.month);
  self.cal_icon.add(self.day);

  self.row.add(self.cal_icon);
  self.row.add(self.content_view);

  return self;
};

module.exports = {render: render}