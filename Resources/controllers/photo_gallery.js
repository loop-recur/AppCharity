Controllers.PhotoGallery = function(view_proxy){
  
  var logInAsGenercUserToAvoidErrorHack = function(cb) {
    Cloud.Users.login({login: 'drboolean', password: '123456'}, function (e) {
      e.success ? cb() : alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
    });
  }
  
  var getCloudPhotos = function(cb){
    Cloud.Photos.query({
        page: 1,
        per_page: 20
    }, function (e) {
        if (e.success) {
          cb(e.photos);
        } else {
            alert('Error:\\n' +
                ((e.error && e.message) || JSON.stringify(e)));
        }
    });    
  };
  
  var cloudPhotoUrlExtractor = function(cloud_photo, style){
    var style = (style || "small_240");
    return cloud_photo.urls[style];
  }
  
  var makeImageViewFromCloudPhoto = function(cloud_photo){
    var view = Ti.UI.createImageView({image: cloudPhotoUrlExtractor(cloud_photo, "small_240")});
    view.addEventListener('longpress', function(e){ showDeleteIcon(e)});
  }
  
  var makePhotoGrid = function(e){
    getCloudPhotos(function(cloud_photos){
      view_proxy.photo_grid = Grid(makeImageViewFromCloudPhoto, {top: 80}, {left_padding:5, top_padding:5}, cloud_photos);
      view_proxy.win.add(view_proxy.photo_grid);
    });
  };
  
  var uploadPhotoToACS = function(e){
    logInAsGenercUserToAvoidErrorHack(function(){
      Cloud.Photos.create({
          photo: e.media
      }, function (e) {
          if (e.success) {
              var photo = e.photos[0];
              alert('Success:\\n' +
                  'id: ' + photo.id + '\\n' +
                  'filename: ' + photo.filename + '\\n' +
                  'size: ' + photo.size,
                  'updated_at: ' + photo.updated_at);
          } else {
              alert('Error:\\n' +
                  ((e.error && e.message) || JSON.stringify(e)));
          }
      });
    });
    
  }
  
  view_proxy.photo_upload_btn.addEventListener("click", function(e){
    Ti.Media.showCamera({success: uploadPhotoToACS, error: function(){alert("Could not show camera.")} });
  });
  
  view_proxy.photo_picker_btn.addEventListener("click", function(e){
    Ti.Media.openPhotoGallery({success: uploadPhotoToACS, error: function(){alert("Could not show photo picker gallery.")} });
  });
  
  view_proxy.win.addEventListener('focus', function(e){
    makePhotoGrid(e);
  })
  
}