isAndroid = Ti.Platform.osname == 'android';
isIPhone = Ti.Platform.osname == 'iphone';
isMobileweb = Ti.Platform.osname == 'mobileweb';

Ti.UI.setBackgroundColor('#FFF');

if(isAndroid) {
  var CloudPush = require('ti.cloudpush');
  CloudPush.enabled = true;
  CloudPush.debug = true;
}

var Cloud = require('ti.cloud');
Cloud.debug = true;  // optional; if you add this line, set it to false for production

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

if(isIPhone) {
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
} else {
    CloudPush.retrieveDeviceToken({
      success: function(e) {
        deviceToken = e.deviceToken;
        alert('success '+e.deviceToken);
      },
      error: function(e) {
        alert('There was an error '+e.error);
      }
    });
}

button1.addEventListener('click', function(){
  Ti.API.info("\n\ndevice token: "+deviceToken);
  Cloud.PushNotifications.subscribe({
      channel: 'main_group',
      device_token: deviceToken,
      type: isIPhone ? 'iphone' : 'android'
  }, function (e) {
      if (e.success) {
          alert('Success');
      } else {
          alert('Error:\\n' +
              ((e.error && e.message) || JSON.stringify(e)));
      }
  });
});
