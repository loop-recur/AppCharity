Hack = {};
module.exports = function(view) {
  var url = 'http://www.doctorswithoutborders.com/';
  
  var openDonateLink = function() {
    Ti.Platform.openURL(url);
  }
  
  var updateBlurb = function(val) {
    if(val) view.blurb.text = val;
  }
  
  var updateLogo = function(val) {
    if(val) view.logo.image = val;
  }
  
  var pullAcsInfo = function() {
    Cloud.Users.login({
        login: 'appcharity',
        password: '123456'
    }, function (e) {
        if (e.success) {
          if(isIPad) {
            Cloud.KeyValues.get({
                name: 'topbar_message'
            }, function (e) {
                if (e.success) {
                  log('was successs dog!')
                  Hack.blurb = e.keyvalues[0].value;
                  updateBlurb(e.keyvalues[0].value);
                }
            });
          }
    
          Cloud.KeyValues.get({
              name: 'logo_url'
          }, function (e) {
              if (e.success) {
                Hack.logo = e.keyvalues[0].value;
                updateLogo(e.keyvalues[0].value);
              }
          });
          
          Cloud.KeyValues.get({
              name: 'donate_url'
          }, function (e) {
              if (e.success) {
                Hack.donate_url = e.keyvalues[0].value;
                url = e.keyvalues[0].value;
              }
          }); 
        }
    });
  };

  view.donate_button.addEventListener('click', openDonateLink);
  
  if(Hack.blurb && Hack.logo && Hack.donate_url) {
    if(isIPad) updateBlurb(Hack.blurb);
    updateLogo(Hack.logo);
  } else {
    pullAcsInfo();
  }
};

