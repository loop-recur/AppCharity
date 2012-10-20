var render = function(event) {
  var DateFormatter = nrequire('/lib/date_formatter'),
      CalendarView = nrequire('/ui/calendar_view');
  
  var self = {
        view: UI.createScrollView({
          top: (isAndroid ? 100 : 136),
          contentHeight: 'auto',
          height: Ti.UI.FILL,
          width: Ti.UI.FILL,
          backgroundColor: 'transparent'
        }),
        
        content_view: UI.createView({
          left: 70,
          top: 15,
          right: 10,
          layout: 'vertical'
        }),

        cal_view: CalendarView(event),

        title: UI.createLabel({
          left: 0,
          color: '#667dad',
          text: event.name,
          height: Ti.UI.SIZE,
          width: Ti.UI.SIZE,
          style_id: 'h3'
        }),

        time: UI.createLabel({
          top: 5,
          left: 0,
          text: DateFormatter.date(event.start_time, {to_date: true, formatted: true}),
          width: Ti.UI.SIZE,
          height: Ti.UI.SIZE,
          style_id: 'p3'
        }),

        image: UI.createImageView({
          top: 10,
          bottom: 10,
          image: event.pic_big,
          height: 120
        }),

        location: UI.createLabel({
          top: 5,
          left: 0,
          text: "@ "+event.location,
          width: Ti.UI.SIZE,
          height: Ti.UI.SIZE,
          style_id: 'p3'
        }),
        
        description: UI.createLabel({
          top: 5,
          text: event.description,
          color: "black",
          width: Ti.UI.SIZE,
          height: Ti.UI.SIZE,
          bottom: 10,
          style_id: 'p3'
        })
      };

  self.view.add(self.cal_view);
  self.content_view.add(self.title);
  self.content_view.add(self.time);
  self.content_view.add(self.location);
  self.content_view.add(self.description);
  self.content_view.add(self.image);
  self.view.add(self.content_view);

  return self;
};

module.exports = {render: render};

