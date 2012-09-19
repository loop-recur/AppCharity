Views.NewsRow = function(news) {
  var self = {
    row: UI.createTableViewRow({
      backgroundImage: news.picture,
      title: news.name
    })
  }
  
  return self;
}