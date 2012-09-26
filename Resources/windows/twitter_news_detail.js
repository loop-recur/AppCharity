var UI = require("/ui/proxies");

module.exports = function(news) {
  var self = {
    win: UI.createWindow({title: "Tweet"})
  }
  
  return self;
}
