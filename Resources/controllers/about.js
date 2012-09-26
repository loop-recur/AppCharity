var AboutDetail = require("/views/about_detail")
, FbGraph = require("/lib/fb_graph")
, PropertyCache = require("/lib/property_cache");

module.exports = function(view) {
  
  var fillContent = function(page) {
    PropertyCache.set('fb_page', page);
    if(view.detail){ view.win.remove(view.detail); }
    view.detail = AboutDetail(page);
    view.win.add(view.detail.view);
  }
  
  var getNewsIfItsBeenLongEnough = function() {
    PropertyCache.get('fb_page', fillContent) || FbGraph.getPage('msf.english', fillContent);
  }
  
  view.win.addEventListener('focus', getNewsIfItsBeenLongEnough);
}
