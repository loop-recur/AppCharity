Controllers.PhotoGallery = function(view_proxy){
  
  var logInAsGenercUserToAvoidErrorHack = function(cb) {
    Cloud.Users.login({login: 'drboolean', password: '123456'}, function (e) {
      e.success ? cb() : alert('Error Logging in to Server');
    });
  }
  
  var getCloudPhotos = function(cb){
    Cloud.Photos.query({page: 1, per_page: 20}, function (e) {
      e.success ? cb(e.photos) : alert('Error Getting photos!');
    });
  };
  
  var makeImageViewFromCloudPhoto = function(cloud_photo){
    return Ti.UI.createImageView({image: cloud_photo.urls.small_240});
  }
  
  var makePhotoGrid = function(e){
    getCloudPhotos(function(cloud_photos){
      var squares = cloud_photos.map(makeImageViewFromCloudPhoto)
      squares.push(view_proxy.photo_upload_btn);
      view_proxy.photo_grid = Grid({top: 0}, {left_padding:2, top_padding:2}, squares);
      view_proxy.view.add(view_proxy.photo_grid);
    });
  };
  
  var uploadPhotoToACS = function(e){
    logInAsGenercUserToAvoidErrorHack(function(){
      Cloud.Photos.create({ photo: e.media }, function (e) {
        var photo = e.success ? e.photos[0] : alert('Error Uploading Photo');
      });
    });
  }
  
  var showCamera = function(e){
    Ti.Media.showCamera({success: uploadPhotoToACS, error: function(){ alert("Could not show camera.") } });
  }
  
  var showGallery = function(e){
    Ti.Media.openPhotoGallery({success: uploadPhotoToACS, error: function(){ alert("Could not show photo picker gallery.") } });
  }
  
  view_proxy.photo_upload_btn.addEventListener("click", function(e){
    view_proxy.confirmation = Confirm("Add a photo", [{name: "Take a photo", callback: showCamera }, {name: "Choose a photo", callback: showGallery}])
  });
    
  view_proxy.win.addEventListener('focus', makePhotoGrid);
  
}