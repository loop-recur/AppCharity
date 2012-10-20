module.exports = function(props) {
  var self = {
        view: UI.createView(_.extend({
          top: 0,
          width: Ti.UI.FILL,
          height: Ti.UI.FILL
        }, props)),
        
        top_shadow: UI.createView({
          top: 0,
          width: Ti.UI.FILL,
          height: 20,
          backgroundImage: '/images/shadow/screen_shadow_top.png'
        }),

        side_shadow: UI.createView({
          top: 20,
          bottom: 20,
          backgroundImage: '/images/shadow/screen_shadow_sides_repeat.png',
          width: Ti.UI.FILL,
          height: Ti.UI.FILL
        }),

        bottom_shadow: UI.createView({
          bottom: 0,
          width: Ti.UI.FILL,
          height: 20,
          backgroundImage: '/images/shadow/screen_shadow_bottom.png'
        })
      };

  self.view.add(self.top_shadow);
  self.view.add(self.side_shadow);
  self.view.add(self.bottom_shadow); 

  return self;
}; 
