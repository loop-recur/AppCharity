Controllers.PhotoGallery = function(view_proxy){
  
  var logInAsGenercUserToAvoidErrorHack = function(cb) {
    Cloud.Users.login({login: 'drboolean', password: '123456'}, function (e) {
      e.success ? cb() : alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
    });
  }
  
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
  
}