Windows.Tweet = function(user, cb) {
  var self = {
    win: UI.createWindow({title: "Tweet", barColor: "black"}),
    
    view: UI.createView({
      layout: 'vertical'
    }),
    
    text_field: UI.createTextField({
			height: 135,
			top: 15,
			width: "85%",
      font: {fontSize: 15},
      hintText: '@'+user,
      value: '@'+user+' ',
      autocorrect: true,
			textAlign: "left",
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
      returnKeyType: Ti.UI.RETURNKEY_GO,
      softKeyboardOnFocus: "SOFT_KEYBOARD_SHOW_ON_FOCUS",
			paddingLeft:10,
			paddingRight:10
    }),
   
    submit: UI.createButton({
      title: "Submit",
      top: 20
    })
  }
  
  self.view.add(self.text_field);
  self.view.add(self.submit);
  self.win.add(self.view);
  
  self.submit.addEventListener('click', function() {
    cb(self.text_field.value);
    self.win.close();
  });
  
  return self;
};
