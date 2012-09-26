var Cloud = require('/commonjs/ti.cloud/2.3.0/ti.cloud');

module.exports = function(){
  var self = {
    photo_upload_btn: UI.createButton({title: "Upload a new photo"})
  };
  
  var uploadPhotoToACS = function(e){
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
  }
  
  self.photo_upload_btn.addEventListener("click", function(e){
    Ti.Media.showCamera({success: uploadPhotoToACS, error: function(){alert("Could not show camera.")} });
  });
  
  
  
  
  return self;
}
    