Controllers.PhotoGallery = function(view) {

  var photo_urls;
  var squares;
  var all_photos = [];

  var logInAsGenercUserToAvoidErrorHack = function(cb) {
    Cloud.Users.login({login: 'appcharity', password: '123456'}, function(e) {
      e.success ? cb() : alert('Error Logging in to Server');
    });
  }

  var makePhotoGrid = function(cloud_photos) {
    all_photos = cloud_photos;
    Ti.App.fireEvent('show_activity');

    if (view.photo_grid) {
      if(isAndroid) {
        squares.map(function(s){
          s.view.image = null;
        });
      }
      view.win.remove(view.photo_grid);
      squares = null;
      view.photo_grid = null;
    }

    photo_urls = cloud_photos.map(function(p){ return p.urls.large_1024; });

    squares = cloud_photos.map(view.makeImageViewFromCloudPhoto);

    var squares_with_btn = squares.concat(view.photo_upload_btn);
    
    view.photo_grid = Grid({
      top: 100
    },{left_padding: 2, top_padding: 2}, squares_with_btn);
    
    view.win.add(view.photo_grid);
    view.photo_grid.addEventListener('click', function(e) {
      if(e.source.index == 'undefined' || e.source.index == null) return;
      Windows.Application.photos.open(Windows.Slideshow(photo_urls, e.source.index).win);
    });
    Ti.App.fireEvent('hide_activity');
  };

  var getCloudPhotos = function() {
    Ti.App.fireEvent('show_activity');
    Cloud.Photos.query({page: 1, per_page: 20}, function(e) {
      if (e.success) {
        PropertyCache.set('cloud_photos', e.photos);
        makePhotoGrid(e.photos);
      } else {
        alert('Error Getting photos!');
      }
    })
  }
  
  var addPhotoToGridAndRefresh = function(photo) {
    var stub_photo = {urls: {small_240: photo, medium_640: photo, large_1024: photo }}; // adapter
    all_photos.push(stub_photo);
    makePhotoGrid(all_photos);
  }

  var uploadPhotoToACS = function(camera_event) {
    Ti.App.fireEvent('show_activity');
    logInAsGenercUserToAvoidErrorHack(function() {
      Cloud.Photos.create({ photo: camera_event.media }, function(e) {
        var photo = e.success ? addPhotoToGridAndRefresh(camera_event.media) : alert('Error Uploading Photo');
      })
    })
  };
    
  var makeImageViewFromCloudPhoto = function(cloud_photo){
    var view = Ti.UI.createImageView({image: cloudPhotoUrlExtractor(cloud_photo, "small_240")});
    view.addEventListener('longpress', function(e){ showDeleteIcon(e)});
  };

  var getCacheOrMakeGrid = function() {
    if(PropertyCache.get('cloud_photos', id) && photo_urls) return;
    PropertyCache.get('cloud_photos', makePhotoGrid) || getCloudPhotos();
  }

  var showCamera = function(e) {
    Ti.Media.showCamera({success: uploadPhotoToACS, error: function() { alert('Could not show camera.') } });
  }

  var showGallery = function(e) {
    Ti.Media.openPhotoGallery({success: uploadPhotoToACS, error: function() { alert('Could not show photo picker gallery.') } });
  }

  view.photo_upload_btn.addEventListener('click', function(e) {
    view.confirmation = Confirm('Add a photo', [{name: 'Take a photo', callback: showCamera }, {name: 'Choose a photo', callback: showGallery}]);
  })

  view.win.addEventListener('focus', getCacheOrMakeGrid);
  Push.addAndroidSettingsEvent(view.win);
};
