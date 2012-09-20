Views.TwitterNewsRow = function(news) {
  var self = {
    row: UI.createTableViewRow({
      title: news.text,
      created: Date.parse(news.created_at),
      news: news,
      kind: "twitter"
    })
  }
  
  return self;
}