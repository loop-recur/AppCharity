UI.CroppedImage = function(props) {
  var view = UI.createView(props),
    
    click_blocker = UI.createView(props),
  
    scroller = UI.createScrollView({
      showHorizontalScrollIndicator:false,
      showVerticalScrollIndicator:false
    }),
    
    image = UI.createImageView({
      image: props.image,
      index: props.index
    });

  
  scroller.add(image);
  view.add(scroller);
  view.add(click_blocker);

  return view;
};