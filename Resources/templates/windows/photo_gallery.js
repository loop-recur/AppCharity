var render = function() {
  var topBanner = nrequire('/templates/views/top_banner'),
      Controller = nrequire('/templates/controllers/photo_gallery'),
      CroppedImage = nrequire('/ui/cropped_image'),
      BorderShadows = nrequire('/ui/border_shadows'),
      photo_size = isIPad ? 340 : (Ti.Platform.displayCaps.platformWidth / 3);

  var self = {
        win: UI.createWindow({
          navBarHidden: true,
          backgroundImage: '/images/backgrounds/main_bg.png',
          backgroundRepeat: true
        }),
    
        donate_banner: topBanner.render().view,

        shadow: BorderShadows({
          top: 100
        }).view,

        photo_upload_btn: UI.createButton({
          width: photo_size,
          height: photo_size,
          skip_scale: true,
          backgroundImage: '/images/buttons/photo_grid_add_btn_sml.png',
          backgroundSelectedImage: '/images/buttons/photo_grid_add_btn_sml_p.png',
          style_id: 'photo_upload_button'
        })
      };
  
  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  
  self.makeImageViewFromCloudPhoto = function(cloud_photo, index) {
    return CroppedImage({
      height: photo_size,
      width: photo_size,
      index: index,
      top: 1,
      bottom: 1,
      image: (isIPad ? cloud_photo.urls.medium_640 : cloud_photo.urls.small_240)
    });
  };

  Controller(self);
  return self;
};

module.exports = {render: render};
