Windows.PhotoGallery = function() {

  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),

    view: UI.createView({
      layout: 'horizontal'
    }),

    photo_upload_btn: UI.createButton({
      width: 107,
      height: 107,
      square: true,
      backgroundImage: '/images/buttons/photo_grid_add_btn_sml.png',
      backgroundSelectedImage: '/images/buttons/photo_grid_add_btn_sml_p.png'
    })
  };

  self.win.add(self.view);

  Controllers.PhotoGallery(self);

  return self;
};