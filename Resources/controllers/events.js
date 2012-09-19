Controllers.Events = function(view) {
  var getNews = FbGraph.getEvents.p(log2("FB RESULT"));
  
  view.win.addEventListener('focus', getNews);
}
