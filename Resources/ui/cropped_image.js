module.exports = function(props) {
  var view = Ti.UI.createView(props),
    
      click_blocker = Ti.UI.createView(props),
  
      scroller = Ti.UI.createScrollView({
        showHorizontalScrollIndicator:false,
        showVerticalScrollIndicator:false
      }),
      
      image = Ti.UI.createImageView({
        image: props.image,
        index: props.index
      });

  if(isAndroid) {
    image.width = props.width;
    image.height = props.height;
  }

  scroller.add(image);
  view.add(scroller);
  view.add(click_blocker);
  view.image = image;

  return view;
};
