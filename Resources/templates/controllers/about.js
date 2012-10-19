module.exports = function(view) {
  var Push = nrequire('/lib/push'),
      Repo = nrequire('/lib/repo'),
      NavItem = nrequire('/templates/views/nav_item'),
      PropertyCache = nrequire('/lib/property_cache'),
  
      nav_items = [],
      
      detail_view = view.detail_view,
  
      getPages = function(cb){
        Repo.getPages(function(e){
          if (e.success) {
            PropertyCache.set('pages', e.AboutUsPage);
            cb(e.AboutUsPage);
          } else {
            alert("Error getting the pages. Please try again.");
          }
        });
      },
  
      setTitle = function(value){
        detail_view.title.text = value;
      },

      setContent = function(value){
        value = value.replace(/\\n?/g, '');
        detail_view.content.text = value;
      },

      setImage = function(value){
        detail_view.photo.image = value;
      },

      setPage = function(page) {
        setImage(page.photo.urls.medium_640);
        setTitle(page.title);
        setContent(page.content);
      },
  
      updateSubMenu = function(idx) {
        nav_items.map(function(s, i) {
          var opacity = (i === idx) ? 0 : 0.7;
          s.mask.animate({opacity: opacity});
        });
      },
  
      clearImagesForAndroidMemory = function() {
        nav_items.map(function(ni){ ni.image.image = null; });
      },
  
      resetSubNav = function() {
        nav_items = [];
        if(isAndroid){ clearImagesForAndroidMemory(); }
        view.subnav.children.map(function(c){ view.subnav.remove(c); });
      },
  
      buildSubNav = function(pages) {
        var width = Ti.Platform.displayCaps.platformWidth / pages.length;
        
        pages.reduce(function(last_left, page, idx) {
          var nav_item = NavItem.render(page, last_left, idx, width);
          view.subnav.add(nav_item.view);
          nav_items.push(nav_item);
          return last_left + nav_item.view.width;
        }, 0);
      },
      
      updatePageDetails = function(page, idx) {
        setPage(page);
        updateSubMenu(idx);
      },
   
      updateMenuAndContent = function(pages){
        resetSubNav();
        buildSubNav(pages);
        updatePageDetails(pages[0], 0);
        Ti.App.fireEvent('hide_activity');
      },
  
      populatePage = function() {
        if(PropertyCache.get('pages', function(){}) && nav_items.length) return;
        PropertyCache.get('pages', updateMenuAndContent) || getPages(updateMenuAndContent);
      };
  
  view.win.addEventListener('focus', populatePage);

  Push.addAndroidSettingsEvent(view.win);
  
  view.subnav.addEventListener('click', function(e){
    if(e.source && e.source.page) { updatePageDetails(e.source.page, e.source.idx); }
  });
};

