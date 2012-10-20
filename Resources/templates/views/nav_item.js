render = function(page, left, idx, width) {
  var Controller = nrequire('/templates/controllers/nav_item');
  
  var COLORS = ['red', 'blue', 'yellow', 'green', 'orange'],
  
      self = {        
        view: Ti.UI.createView({
          width: width,
          left: left,
          page: page,
          idx: idx
        }),

        title_view: UI.createView({
          backgroundColor: "white",
          bottom:24,
          width: 120,
          height: Ti.UI.SIZE,
          page: page,
          idx: idx
        }),

        title: UI.createLabel({
          text: page.title,
          top: 5,
          color: "black",
          font: {fontWeight: 'normal'},
          bottom: 5,
          left: 5,
          right: 5,
          width: 120,
          height: Ti.UI.SIZE,
          page: page,
          idx: idx
        }),

        scroll: UI.createView({
          height: Ti.UI.FILL,
          width: Ti.UI.FILL,
          page: page,
          idx: idx
        }),

        mask: UI.createView({
          backgroundImage: "/images/backgrounds/about_nav_overlay_"+COLORS[idx]+".png",
          opacity: 0.7,
          width: Ti.UI.FILL,
          height: Ti.UI.FILL,
          page: page,
          idx: idx
        }),

        image: UI.createImageView({
          image: page.photo.urls.medium_640,
          page: page,
          idx: idx
        })
      };
  
  self.scroll.add(self.image);
  self.view.add(self.scroll);
  self.view.add(self.mask);
  self.title_view.add(self.title);
  self.title_view.transform = Ti.UI.create2DMatrix().rotate(90);
  self.view.add(self.title_view);
  self.view.mask = self.mask; // for accessor in spec
  
  Controller(self);
  return self;
};

module.exports = {render: render};
