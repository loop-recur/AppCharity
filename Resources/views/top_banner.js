Views.TopBanner = function() {
  var self = {
    view: UI.createView({
      style_id: 'top_banner',
      top: 0,
      width: 320,
      height: 100,
      backgroundImage: '/images/backgrounds/logo_donate_bar_mobile_bg.png'
    }),
    
    blurb: UI.createLabel({
      text: '"yadda yadda yadda"',
      color: "#999",
      top: "15%",
      textAlign: "center",
      width: "50%"
    }),
    
    logo: UI.createImageView({
      left: "4%",
      image: '/images/placeholder_logo.png'
    }),
    
    donate_button: UI.createButton({
      backgroundImage: '/images/buttons/donate_button.png',
      backgroundSelectedImage: '/images/buttons/donate_button_p.png',
      width: 83,
      height: 38,
      right: "5%"
    })
  };
 
  self.view.add(self.logo);
  self.view.add(self.donate_button);
  if(isIPad) self.view.add(self.blurb);
  
  Controllers.TopBanner(self);

  return self;
}; 