Controllers.TopBanner = function(view) {
  var openDonateLink = function() {
    Ti.Platform.openURL('http://www.venganza.org/join/');
  }
  
  view.donate_button.addEventListener('click', openDonateLink);
}
