Controllers.TopBanner = function(view) {
  var openDonateLink = function() {
    Ti.Platform.openURL('http://www.doctorswithoutborders.org/');
  }
  
  view.donate_button.addEventListener('click', openDonateLink);
}
