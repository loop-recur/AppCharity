Windows.PhotoGallery = function(){
  
  var self = {
    win: UI.createWindow(),
    view: UI.createView({
      layout: 'horizontal'
    }),
    photo_upload_btn: UI.createButton({title: "Upload a new photo", left: 0})
  };

  self.win.add(self.view);

  Controllers.PhotoGallery(self);
  
  return self;
}
