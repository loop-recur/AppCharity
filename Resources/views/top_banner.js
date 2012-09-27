Views.TopBanner = function() {
  var self = {
    view: UI.createView({
      top: 0,
      width: 320,
      height: 100,
      backgroundImage: '/images/backgrounds/logo_donate_bar_mobile_bg.png'
    }),
    
    logo: UI.createImageView({
      left: 15, 
      image: '/images/placeholder_logo.png'
    }),
    
    donate_button: UI.createButton({
      backgroundImage: '/images/buttons/donate_button.png',
      backgroundSelectedImage: '/images/buttons/donate_button_p.png',
      width: 83,
      height: 38,
      right: 20
    })
  };
 
  self.view.add(self.logo);
  self.view.add(self.donate_button);
  
  Controllers.TopBanner(self);

  return self;
}; 