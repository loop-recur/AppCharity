module.exports = function(event) {
  var DateFormatter = nrequire('/lib/date_formatter');

  var view = UI.createView({
        layout: 'horizontal',
        width: Ti.UI.SIZE,
        top: 15,
        bottom: 15,
        left: 0,
        height: Ti.UI.SIZE
      }),

      icon = UI.createView({
        backgroundImage: '/images/icons/events_calendar.png',
        height: 55,
        width: 50,
        left: 10,
        square: true
      }),

      month = UI.createLabel({
        text: DateFormatter.date(event.start_time, {month: true}),
        top: 2,
        height: Ti.UI.SIZE,
        color:"#515151",
        font: {
          fontFamily: 'Helvetica Neue',
          fontSize: 10
        }
       }),

      day = UI.createLabel({
        text: DateFormatter.date(event.start_time, {day: true}),
        top: 13,
        height: Ti.UI.SIZE,
        color:"#515151",
        font: {
          fontFamily: 'Helvetica Neue',
          fontSize: 30,
          fontWeight: 'bold'
        }
      });

  icon.add(month);
  icon.add(day);
  view.add(icon);

  return view;
};

