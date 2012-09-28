Windows.PhotoGallery = function(){
  
  var self = {
    win: UI.createWindow(),
    photo_upload_btn: UI.createButton({title: "Upload a new photo", left: 0}), 
    photo_picker_btn: UI.createButton({title: "Upload a photo from your phone", right: 0}), 
  };

  self.win.add(self.photo_upload_btn);
  self.win.add(self.photo_picker_btn);

  Controllers.PhotoGallery(self);
  
  return self;
}

