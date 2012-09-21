Views.FbNewsRow = function(news) {
  var self = {
    row: UI.createTableViewRow({
      created: Date.parse(news.created_time),
      news: news,
      kind: "fb"
    }),
    
    photo: UI.createImageView({
      image: news.picture,
      top: 0,
      left: 5,
      width: 60,
      height: 80
    }),
    
    title_view: UI.createView({
      layout: 'vertical',
      left: 80,
      height: Ti.UI.SIZE
    }),
    
    title: UI.createLabel({
      text: news.name,
      color: 'blue',
      height: Ti.UI.SIZE
    }),
    
    time_and_place: UI.createView({
      layout: 'horizontal',
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    }),
    
    time: UI.createLabel({
      text: news.created_time,
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    }),
    
    world: UI.createImageView({
      image: "",
      width: 10,
      height: 10
    }),
    
    via: UI.createLabel({
      text: "via",
      width: Ti.UI.SIZE,
      height: Ti.UI.SIZE
    }),
    
    fb_icon: UI.createImageView({
      image: "",
      width: 10,
      height: 10
    })
  }
  
  self.title_view.add(self.title);
  self.time_and_place.add(self.time);
  self.time_and_place.add(self.world);
  self.time_and_place.add(self.via);
  self.time_and_place.add(self.fb_icon);
  self.title_view.add(self.time_and_place);
  self.row.add(self.photo);
  self.row.add(self.title_view);
  
  return self;
}
