Windows.PhotoGallery = function() {
  var photo_size = (Ti.Platform.displayCaps.platformWidth / 3.1);

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
      backgroundSelectedImage: '/images/buttons/photo_grid_add_btn_sml_p.png'
    })
  };
  
  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  
  self.makeImageViewFromCloudPhoto = function(cloud_photo, index) {
    return UI.createImageView({
      index: index,
      height: photo_size,
      width: photo_size,
      top: 5,
      left: 2,
      right: 2,
      bottom: 5,
      image: cloud_photo.urls.large_1024
    });
  }

  Controllers.PhotoGallery(self);

  return self;
};