Controllers.PhotoGallery = function(view){
  
  var logInAsGenercUserToAvoidErrorHack = function(cb) {
    Cloud.Users.login({login: 'drboolean', password: '123456'}, function (e) {
      e.success ? cb() : alert('Error Logging in to Server');
    });
  }
  
  var makeImageViewFromCloudPhoto = function(cloud_photo){
    return Ti.UI.createImageView({image: cloud_photo.urls.small_240});
  }
  
  var makePhotoGrid = function(cloud_photos){
    if(view.photo_grid){ view.win.remove(view.photo_grid); }
    var squares = cloud_photos.map(makeImageViewFromCloudPhoto)
    squares.push(view.photo_upload_btn);
    view.photo_grid = Grid({top: 0}, {left_padding:2, top_padding:2}, squares);
    view.win.add(view.photo_grid);
    Ti.App.fireEvent('hide_activity');
  };
  
  var getCloudPhotos = function(){
    Ti.App.fireEvent('show_activity');
    Cloud.Photos.query({page: 1, per_page: 20}, function (e) {
      if(e.success) {
        PropertyCache.set('cloud_photos', e.photos);
        makePhotoGrid(e.photos);
      } else {
        alert('Error Getting photos!');
      }
    });
  };
  
  var uploadPhotoToACS = function(e){
    Ti.App.fireEvent('show_activity');
    logInAsGenercUserToAvoidErrorHack(function(){
      Cloud.Photos.create({ photo: e.media }, function (e) {
        var photo = e.success ? e.photos[0] : alert('Error Uploading Photo');
        Ti.App.fireEvent('hide_activity');
      });
    });
  }
  
  var getCacheOrMakeGrid = function() {
    PropertyCache.get('cloud_photos', makePhotoGrid) || getCloudPhotos();
  }
  
  var showCamera = function(e){
    Ti.Media.showCamera({success: uploadPhotoToACS, error: function(){ alert("Could not show camera.") } });
  }
  
  var showGallery = function(e){
    Ti.Media.openPhotoGallery({success: uploadPhotoToACS, error: function(){ alert("Could not show photo picker gallery.") } });
  }
  
  view.photo_upload_btn.addEventListener("click", function(e){
    view.confirmation = Confirm("Add a photo", [{name: "Take a photo", callback: showCamera }, {name: "Choose a photo", callback: showGallery}])
  });
    
  view.win.addEventListener('focus', getCacheOrMakeGrid);
  
}