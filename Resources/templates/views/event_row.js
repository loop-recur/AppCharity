var render = function(event) {
  var DateFormatter = nrequire('/lib/date_formatter'),
      CalendarView = nrequire('/ui/calendar_view');
  
  var self = {
        row: UI.createTableViewRow({
          start_time: event.start_time,
          layout: 'horizontal',
          event: event,
          className: 'event'
        }),

        cal_view: CalendarView(event),

        content_view: UI.createView({
          layout: 'vertical',
          left: 10,
          right: 10,
          top: 15,
          bottom: 10,
          height: Ti.UI.SIZE,
          width: 235
        }),

        title: UI.createLabel({
          text: event.name,
          color: '#667dad',
          left: 0,
          height: Ti.UI.SIZE,
          width: Ti.UI.SIZE,
          style_id: 'h3'
        }),
    
        time: UI.createLabel({
          top: 5,
          left: 0,
          color: "#444444",
          text: DateFormatter.date(event.start_time, {to_date: true, formatted: true}),
          width: Ti.UI.SIZE,
          height: Ti.UI.SIZE,
          style_id: 'p3'
        })
      };

  self.content_view.add(self.title);
  self.content_view.add(self.time);
  self.row.add(self.cal_view);
  self.row.add(self.content_view);

  return self;
};

module.exports = {render: render};
