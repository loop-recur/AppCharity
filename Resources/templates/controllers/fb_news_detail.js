module.exports = function(view) {
  if(!isAndroid) { view.back_btn.addEventListener('click', function(){view.win.close()}); }
};

