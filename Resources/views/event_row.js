Views.EventRow = function(event) {
  var self = {    
    row: UI.createTableViewRow({
      start_time: new Date(event.start_time),
      event: event
    }),
    
    date: UI.createLabel({
      text: new Date(event.start_time),
      top: 0,
      left: 5,
      width: 80,
      height: 80
    }),
    
    right_view: UI.createView({
      layout: 'vertical',
      left: 80,
      height: Ti.UI.SIZE
    }),
    
    title: UI.createLabel({
      text: event.name,
      color: 'blue',
      height: Ti.UI.SIZE
    }),
    
    time: UI.createLabel({
      text: new Date(event.start_time),
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    }),
    
    location: UI.createLabel({
      text: event.location,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    }),
    
    description: UI.createLabel({
      text: event.description,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    })
  }
  
  self.right_view.add(self.title);
  self.right_view.add(self.time);
  self.right_view.add(self.location);
  self.right_view.add(self.description);
  self.row.add(self.date);
  self.row.add(self.right_view);
  
  return self;
}