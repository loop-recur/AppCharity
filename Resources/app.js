isAndroid = Ti.Platform.osname == 'android';
isIPhone = Ti.Platform.osname == 'iphone';
isMobileweb = Ti.Platform.osname == 'mobileweb';

Cloud = require('./commonjs/ti.cloud/2.3.0/ti.cloud');

// TODO: Begin basic template app. Delete and move everything later. 
Ti.UI.setBackgroundColor('#FFF');


var tabGroup = Ti.UI.createTabGroup();

var win1 = Ti.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});

var tab1 = Ti.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var label1 = Ti.UI.createLabel({
	color:'#999',
	text:'I am Window 1',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var button1 = Ti.UI.createButton({
  bottom: 40,
  width: 'auto',
  title: "Register"
});

win1.add(label1);
win1.add(button1);

var win2 = Ti.UI.createWindow({  
    title:'Tab 2',
    backgroundColor:'#fff'
});
var tab2 = Ti.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Ti.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

tabGroup.open();
