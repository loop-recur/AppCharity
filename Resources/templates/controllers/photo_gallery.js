module.exports = function(view) {
  var Slideshow = nrequire('/templates/windows/slideshow'),
      Grid = nrequire('/ui/grid'),
      Repo = nrequire('/lib/repo'),
      PropertyCache = nrequire('/lib/property_cache'),
      Confirm = nrequire('/ui/confirm');
  
  var slideshow_urls = [],
      squares = [],
      local_photos = [],
      
      openSlideShow = function(e) {
        if(e.source.index === 'undefined' || e.source.index === null) return;
        var slideshow = Slideshow.render(slideshow_urls, e.source.index);
        Application.photos.open(slideshow.win);
      },
      
      clearImagePropertiesForAndroidMemory = function() {
        squares.map(function(s){
          if(s.view) { s.view.image = null; }
        });
      },
      
      resetGrid = function() {
        if(!view.photo_grid) { return; }
        if(isAndroid) { clearImagePropertiesForAndroidMemory(); }
        view.win.remove(view.photo_grid);
        squares = null;
        view.photo_grid = null;
      },
      
      storeState = function(cloud_photos) {
        local_photos = cloud_photos;
        slideshow_urls = cloud_photos.map(function(p){ return p.urls.large_1024; });
      },
      
      makeGrid = function(cloud_photos) {
        squares = cloud_photos.map(view.makeImageViewFromCloudPhoto);

        view.photo_grid = Grid({top: 100},
                               {left_padding: 2, top_padding: 2},
                               squares.concat(view.photo_upload_btn));
    
        view.win.add(view.photo_grid);
        view.photo_grid.addEventListener('click', openSlideShow);
      },

      populateView = function(cloud_photos) {
        Ti.App.fireEvent('show_activity');
        resetGrid();
        storeState(cloud_photos);
        makeGrid(cloud_photos);
        Ti.App.fireEvent('hide_activity');
      },
      
      makeLocalPhotoLookLikeCloudPhotoBecauseItIsntProcessedYet = function(photo) {
        return {urls: {small_240: photo, medium_640: photo, large_1024: photo }};
      },
  
      addPhotoAndRefresh = function(photo) {
        var photo_adapter = makeLocalPhotoLookLikeCloudPhotoBecauseItIsntProcessedYet(photo);
        local_photos.push(photo_adapter);
        populateView(local_photos);
      },

      uploadPhotoToACS = function(camera_event) {
        Repo.uploadPhoto(camera_event.media, function(e){
          addPhotoAndRefresh(camera_event.media);
        });
      },
      
      hasntRenderedPage = function() {
        return slideshow_urls.length === 0;
      },

      populatePage = function() {
        if(Repo.cacheHasExpired('cloud_photos') || hasntRenderedPage()) {
          Repo.getPhotos(populateView);
        }
      },

      showCamera = function(e) {
        Ti.Media.showCamera({
          success: uploadPhotoToACS, 
          error: function() {
            alert('Could not show camera.');
          }
        });
      },

      showGallery = function(e) {
        Ti.Media.openPhotoGallery({
          success: uploadPhotoToACS,
          error: function() {
            alert('Could not show photo picker gallery.');
          }
        });
      };

  view.photo_upload_btn.addEventListener('click', function(e) {
    view.confirmation = Confirm('Add a photo', [{name: 'Take a photo', callback: showCamera }, {name: 'Choose a photo', callback: showGallery}]);
  });

  view.win.addEventListener('focus', populatePage);
};
