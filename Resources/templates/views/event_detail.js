var DateFormatter = nrequire('/lib/date_formatter');

module.exports.render = function(event) {
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

    cal_view: UI.createView({
      layout: 'horizontal',
      width: Ti.UI.FILL,
      top: 15,
      height: Ti.UI.SIZE
    }),

    cal_icon: UI.createView({
      backgroundImage: '/images/icons/events_calendar.png',
      height: 55,
      width: 50,
      left: 10,
      square: true
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
      height: Ti.UI.SIZE,
			color:"#515151",
      font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 30,
        fontWeight: 'bold'
      }
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
      text: DateFormatter.date(event.start_time, {to_date: true, formatted: true}),
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),

    image: UI.createImageView({
      top: 10,
      bottom: 10,
      image: event.pic_big,
      height: 120
    }),

    location: UI.createLabel(merge(Style.p3, {
      top: 5,
      left: 0,
      text: "@ "+event.location,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })),
    
    show_map_view: UI.createView({
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE,
      left:0
    }),
    
    show_map_parens: UI.createLabel({
      text: '(                  )',
      left:0,
      font: {fontSize: 13},
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    }),
    
    show_map: UI.createLabel({
      text: "show map",
      left:4,
      color: '#d9dee4',
      font: {fontSize: 13, fontWeight: 'bold'},
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE
    }),

    description: UI.createLabel(merge(Style.p3, {
      top: 5,
      text: event.description,
      color: "black",
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE,
      bottom: 10
    }))
  };

  self.cal_icon.add(self.month);
  self.cal_icon.add(self.day);
  self.cal_view.add(self.cal_icon);
  self.view.add(self.cal_view);
  
  
  // self.show_map_view.add(self.show_map_parens);
  // self.show_map_view.add(self.show_map);
  // self.content_view.add(self.show_map_view);
  
  self.content_view.add(self.title);
  self.content_view.add(self.time);
  self.content_view.add(self.location);
  self.content_view.add(self.description);
  self.content_view.add(self.image);
  
  self.view.add(self.content_view);

  return self;
};

