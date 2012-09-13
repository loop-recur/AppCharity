// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#000');

var Cloud = require('commonjs/ti.cloud/2.3.0/ti.cloud');
Cloud.debug = true;  // optional; if you add this line, set it to false for production


// create tab group
var tabGroup = Ti.UI.createTabGroup();


//
// create base UI tab and root window
//
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

//
// create controls tab and root window
//
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



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
// 
// Cloud.KeyValues.get({
//     name: 'donate_link'
// }, function (e) {
//     if (e.success) {
//         var keyvalue = e.keyvalues[0];
//         Ti.API.info('Success:\\n' +
//             'name: ' + keyvalue.name + '\\n' +
//             'value: ' + keyvalue.value);
//     } else {
//         alert('Error:\\n' +
//             ((e.error && e.message) || JSON.stringify(e)));
//     }
// });

var deviceToken = "";


Ti.API.info("\n\nSTARTING REGISTER");
Ti.API.info(Ti.Network.NOTIFICATION_TYPE_BADGE);
Ti.API.info(Ti.Network.NOTIFICATION_TYPE_ALERT);
Ti.API.info(Ti.Network.NOTIFICATION_TYPE_SOUND);

Ti.Network.registerForPushNotifications({
    types: [
        Ti.Network.NOTIFICATION_TYPE_BADGE,
        Ti.Network.NOTIFICATION_TYPE_ALERT,
        Ti.Network.NOTIFICATION_TYPE_SOUND
    ],
    success:function(e)
    {
        Ti.API.info("success");
        Ti.API.info(e);
        deviceToken = e.deviceToken;
        label1.text = "Device registered. Device token: nn"+deviceToken;
        Ti.API.info("Push notification device token is: "+deviceToken+"Push notification types: "+Ti.Network.remoteNotificationTypes+"Push notification enabled: "+Ti.Network.remoteNotificationsEnabled);
    },
    error:function(e)
    {
        Ti.API.info("error");
        label1.text = "Error during registration: "+e.error;
    },
    callback:function(e)
    {
        // called when a push notification is received.
        alert("Received a push notificationnnPayload:nn"+JSON.stringify(e.data));
    },
    messageCallback: function(e) {
      Ti.API.info("messageCallback");
      Ti.API.info(e);
    }
});
Ti.API.info("\n\nPAST REGISTER");

Cloud.Users.login({
    login: 'drboolean',
    password: '123456'
}, function (e) {
    if (e.success) {
        var user = e.users[0];
        alert('Success:\\n' +
            'id: ' + user.id + '\\n' +
            'first name: ' + user.first_name + '\\n' +
            'last name: ' + user.last_name);
    } else {
        alert('Error:\\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});


button1.addEventListener('click', function(){
  Ti.API.info("\n\ndevice token: "+deviceToken);
  Cloud.PushNotifications.subscribe({
      channel: 'main_group',
      device_token: deviceToken
  }, function (e) {
      if (e.success) {
          alert('Success');
      } else {
          alert('Error:\\n' +
              ((e.error && e.message) || JSON.stringify(e)));
      }
  });
});
