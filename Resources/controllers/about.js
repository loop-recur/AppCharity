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
        }
    });
  };
  
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
  
  var setPage = function(page) {
    setImage(page.photo.urls.medium_640);
    setTitle(page.title);
    setContent(page.content);
  }
  
  var updateSubMenu = function(idx) {
    subnav.map(function(s, i){
      var opacity = (i == idx) ? 0 : 0.3;
      s.mask.animate({opacity: opacity});
    });
  }
   
  var updateMenuAndContent = function(pages){
    subnav = [];
    view_proxy.subnav.children.map(function(c){ view_proxy.subnav.remove(c); });
    var width = Ti.Platform.displayCaps.platformWidth / pages.length;
    pages.reduce(function(last_left, page, idx) {
      var nav_item = view_proxy.addSubNavItem(page, last_left, idx, width);
      nav_item.addEventListener('click', function(e){
        setPage(page);
        updateSubMenu(idx);
      });
      subnav.push(nav_item);
      return last_left+nav_item.width;
    }, 0);
    subnav[0].fireEvent('click');
    Ti.App.fireEvent('hide_activity');
  }
  
  var populatePage = function() {
    PropertyCache.get('pages', updateMenuAndContent) || fetchAllSubpageData(updateMenuAndContent);
  }
  
  view_proxy.win.addEventListener('focus', populatePage);
}
