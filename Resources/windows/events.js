Windows.Events = function() {
  var self = {
    win: UI.createWindow({
	  navBarHidden: true    	
    }),

    donate_banner: Views.TopBanner().view
  };

  self.win.add(self.donate_banner);
  
  Controllers.Events(self);
  
  return self;
}