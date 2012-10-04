Windows.PhotoGallery = function() {
  var photo_size = (Ti.Platform.displayCaps.platformWidth / 3);

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
      width: photo_size,
      height: photo_size,
      square: true,
      backgroundImage: '/images/buttons/photo_grid_add_btn_sml.png',
      backgroundSelectedImage: '/images/buttons/photo_grid_add_btn_sml_p.png',
      style_id: 'photo_upload_button'
    })
  };
  
  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  
  self.makeImageViewFromCloudPhoto = function(cloud_photo, index) {
    return UI.CroppedImage({
      height: photo_size,
      width: photo_size,
      index: index,
      top: 1,
      bottom: 1,
      image: (isIPad ? cloud_photo.urls.medium_640 : cloud_photo.urls.small_240)
    });
  }

  Controllers.PhotoGallery(self);

  return self;
};