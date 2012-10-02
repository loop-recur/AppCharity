Controllers.About = function(view_proxy) {
  var detail_view_proxy = view_proxy.detail_view_proxy;
  
  // Callback, passed to AboutUsFetcher
  var setTitle = function(value){
    detail_view_proxy.title.text = value;
  };

  // Callback, passed to AboutUsFetcher
  var setContent = function(value){
    detail_view_proxy.content.text = value;
  };

  // Callback, passed to AboutUsFetcher
  var setImage = function(value){
    detail_view_proxy.photo.image = value;
  };
    
  // Callback, passed to AboutUsFetcher and expecting an object literal of items needed to build the submenu.
  var setSubmenu = function(hash){
    
  }; 
   
  var updateMenuAndContent = function(nav_number){
    var fetcher = AboutUsFetcher(nav_number);
    fetcher.fetchTitle(setTitle);
    fetcher.fetchContent(setContent);
    fetcher.fetchImageUrl(setImage);
    // fetcher.fetchSubmenuHash(setSubmenu);
  }
  
  view_proxy.win.addEventListener('focus', function(e){ updateMenuAndContent(1); });
}
