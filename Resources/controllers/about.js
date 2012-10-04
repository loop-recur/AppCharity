Controllers.About = function(view_proxy) {
  var subnav = [];
  var detail_view_proxy = view_proxy.detail_view_proxy;
  
  var fetchAllSubpageData = function(cb){
    Cloud.Objects.query({
        classname: 'AboutUsPage',
        page: 1,
        per_page: 10
    }, function (e) {
        if (e.success) {
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
    var nav_item = subnav[idx];
    var nav_item_width = Ti.Platform.displayCaps.platformWidth / 2.2;
    
    var room_left = Ti.Platform.displayCaps.platformWidth - nav_item_width;

    var width = room_left / (subnav.length-1);
    
    subnav.map(function(s, i){
      var left = (idx < i) ? (nav_item_width + ((i-1) * width)) : (width * i);
      
      if(i == idx) {
        s.animate({width: nav_item_width, left: left});
      } else {
        s.animate({width: width, left: left});
      }
    });
    // subnav
  }
   
  var updateMenuAndContent = function(){
    fetchAllSubpageData(function(pages){
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
    });
  }
  
  view_proxy.win.addEventListener('focus', updateMenuAndContent);
}
