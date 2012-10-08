Windows.Tweet = function(user, cb) {
  var self = {
    win: UI.createWindow({
      title: "Tweet",
      barColor: "black",
      backgroundImage: '/images/backgrounds/main_bg.png',
      backgroundRepeat: true
    }),
    
    donate_banner: Views.TopBanner().view,
    
    shadow: UI.BorderShadows({top: 100}).view,

    view: UI.createView({
      top: 100,
      layout: 'vertical'
    }),

    button_view: UI.createView({
      width: Ti.UI.FILL, 
      height: Ti.UI.SIZE
    }),
    
    text_view: UI.createView({
      width: Ti.UI.FILL, 
      height: Ti.UI.SIZE
    }),

    separator_view: UI.createView({
      height: 1,
      width: Ti.UI.FILL,
      backgroundColor: '#CCC'
    }),
    
    cancel_button: UI.createButton({
      backgroundImage: '/images/buttons/cancel_btn.png',
      backgroundSelectedImage: '/images/buttons/cancel_btn_p.png',
      width: 56,
      height: 28,
      left: "5%",
      top: 10,
      bottom: 10
    }),
    
    reply_text: UI.createLabel(merge(Style.p3,{
      text: "Reply to @"+user,
      color: "black",
      height: Ti.UI.SIZE,
      width: Ti.UI.SIZE,
      top: 10,
      bottom: 10
    })),
   
    tweet_button: UI.createButton({
      backgroundImage: '/images/buttons/tweet_btn.png',
      backgroundSelectedImage: '/images/buttons/tweet_btn_p.png',
      width: 56,
      height: 28,
      right: "5%",
      top: 10,
      bottom: 10
    }),
    
    text_field: UI.createTextField({
			height: 135,
			top: 15,
			id: "text_field",
			width: "85%",
			color: "#999999",
      font: {fontSize: 15},
      backgroundColor: "white",
      hintText: '@'+user,
      value: '@'+user+' ',
      autocorrect: true,
			textAlign: "left",
			borderWidth: 1,
    	borderColor: '#ccc',
      returnKeyType: Ti.UI.RETURNKEY_GO,
      softKeyboardOnFocus: "SOFT_KEYBOARD_SHOW_ON_FOCUS",
			paddingLeft:10,
			paddingRight:10,
			paddingTop:2
    })
  };
  
  self.button_view.add(self.cancel_button);
  self.button_view.add(self.reply_text);
  self.button_view.add(self.tweet_button);
  self.text_view.add(self.text_field);

  self.win.add(self.donate_banner);
  self.win.add(self.shadow);
  self.win.add(self.view);

  self.view.add(self.button_view);
  self.view.add(self.separator_view);
  self.view.add(self.text_view);
  
  self.cancel_button.addEventListener('click', function() {
    self.win.close();
  });  
  
  self.tweet_button.addEventListener('click', function() {
    cb(self.text_field.value);
    self.win.close();
  });
  
  self.text_field.addEventListener('return', function() {
    cb(self.text_field.value);
    self.win.close();
  });
  
  if(!isAndroid) {
    self.view.addEventListener('click', function(e) {
      if(e.source.id != "text_field") {
        self.text_field.blur();
      }
    }); 
  }

  return self;
};
