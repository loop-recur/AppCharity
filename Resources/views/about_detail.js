Views.AboutDetail = function(page) {
  var self = {
    view: UI.createScrollView({
      height: Ti.UI.FILL
    }),
    
    vertical_view: UI.createView({
      layout: "vertical",
      height: Ti.UI.SIZE
    }),
    
    title: UI.createLabel({
      text: "About Us",
      height: Ti.UI.SIZE
    }),
  
    photo: UI.createImageView({
      image: page.cover.source,
      width: 150,
      height: Ti.UI.SIZE
    }),
    
    tweet_button: UI.createButton({
      top: 30,
      right: 30,
      title: "tweet"
    }),
    
    fb_button: UI.createButton({
      top: 60,
      right: 30,
      title: "fb share"
    }),
    
    overview: UI.createLabel({
      text: page.company_overview
    }),
    
    about: UI.createLabel({
      text: page.about
    }),
    
    mission: UI.createLabel({
      text: page.mission
    })
  }
 
  self.vertical_view.add(self.title);
  self.vertical_view.add(self.photo);
  self.vertical_view.add(self.overview);
  self.vertical_view.add(self.about);
  self.vertical_view.add(self.mission);
  self.view.add(self.vertical_view);
  self.view.add(self.tweet_button);
  self.view.add(self.fb_button);
  
  Controllers.AboutDetail(self, page);

  return self;
}