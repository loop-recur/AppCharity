Controllers.About = function(view) {
  
  var fillContent = function(page) {
    view.detail = Views.AboutDetail(page);
    view.win.add(view.detail.view);
  }

  var getNewsIfItsBeenLongEnough = function() {
    PropertyCache.get('fb_page', fillContent) || FbGraph.getPage(fillContent);
  }
  
  view.win.addEventListener('focus', getNewsIfItsBeenLongEnough);
}
