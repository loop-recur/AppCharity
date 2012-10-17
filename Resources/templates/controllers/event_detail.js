module.exports = function(view) {
  if(!isAndroid) { view.back_btn.addEventListener('click', view.win.close_); }
};

