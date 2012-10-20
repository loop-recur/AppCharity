module.exports = function(callback) {
  Ti.UI.Android.openPreferences();
  
  var makeDialog = function(){
        var dialog = Ti.UI.createAlertDialog({ title:'Settings', message:'Settings were saved...', ok:'OK' });
        dialog.show();
        dialog.addEventListener('click', callback);
      };
  
  setTimeout(makeDialog, 200);
};
