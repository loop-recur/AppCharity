Windows.PhotoGallery = function() {

  var self = {
    win: UI.createWindow({
      navBarHidden: true,
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),
    
    donate_banner: Views.TopBanner().view,

    shadow: UI.BorderShadows({
      top: 100,
    }).view,

    photo_upload_btn: UI.createButton({
      width: 107,
      height: 107,
      square: true,
      backgroundImage: '/images/buttons/photo_grid_add_btn_sml.png',
      backgroundSelectedImage: '/images/buttons/photo_grid_add_btn_sml_p.png'
    })
  };
  
  self.win.add(self.donate_banner);
  self.win.add(self.shadow);

  Controllers.PhotoGallery(self);

  return self;
};