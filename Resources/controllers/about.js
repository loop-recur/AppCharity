Controllers.About = function(view_proxy) {
  var subnav = [];
  var detail_view_proxy = view_proxy.detail_view_proxy;
  
  var fetchAllSubpageData = function(cb){
    Ti.App.fireEvent('show_activity');
    Cloud.Objects.query({
        classname: 'AboutUsPage',
        page: 1,
        per_page: 10
    }, function (e) {
        if (e.success) {
          PropertyCache.set('pages', e.AboutUsPage);
          cb(e.AboutUsPage);
        } else {
          alert(JSON.stringify(e));
          Ti.App.fireEvent('hide_activity');
        }
    });
  };
  
  // Callback, passed to AboutUsFetcher
  var setTitle = function(value){
    detail_view_proxy.title.text = value;
  };

  // Callback, passed to AboutUsFetcher
  var setContent = function(value){
    value = value.replace(/\\n?/g, '');
    detail_view_proxy.content.text = value;
  };

  // Callback, passed to AboutUsFetcher
  var setImage = function(value){
    detail_view_proxy.photo.image = value;
  };

  var setPage = function(page) {
    setImage(page.photo.urls.medium_640);
    setTitle(page.title);
    setContent(page.content);
  };
  
  var updateSubMenu = function(idx) {
    subnav.map(function(s, i){
      var opacity = (i == idx) ? 0 : 0.7;
      s.mask.animate({opacity: opacity});
    });
  };
   
  var updateMenuAndContent = function(pages){
    subnav = [];
      if(isAndroid){ subnav.map(function(ni){ ni.image.image = null; }); }
      view_proxy.subnav.children.map(function(c){ view_proxy.subnav.remove(c); });
    
    var width = Ti.Platform.displayCaps.platformWidth / pages.length;
    pages.reduce(function(last_left, page, idx) {
      var nav_item = view_proxy.addSubNavItem(page, last_left, idx, width);
      subnav.push(nav_item);
      return last_left+nav_item.width;
    }, 0);
    setPage(pages[0]);
    updateSubMenu(0);
    Ti.App.fireEvent('hide_activity');
  }
  
  var populatePage = function() {
    if(PropertyCache.get('pages', id) && subnav.length) return;
    PropertyCache.get('pages', updateMenuAndContent) || fetchAllSubpageData(updateMenuAndContent);
  }
  
  view_proxy.win.addEventListener('focus', populatePage);

  Push.addAndroidSettingsEvent(view_proxy.win);
  
  view_proxy.subnav.addEventListener('click', function(e){
    if(e.source && e.source.page) {
      setPage(e.source.page);
      updateSubMenu(e.source.idx);
    }
  });
};

