module.exports = function(view, callback) {
  var finish = function(e) {
        callback(view.text_field.value);
        view.win.close();
      };
  
  view.cancel_button.addEventListener('click', function() {
    view.win.close();
  });

  view.tweet_button.addEventListener('click', finish);
  view.text_field.addEventListener('return', finish);

  if(!isAndroid) {
    view.view.addEventListener('click', function(e) {
      if(e.source.id != "text_field") {
        view.text_field.blur();
      }
    }); 
  }
};
