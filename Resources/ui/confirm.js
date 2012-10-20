module.exports = function(msg, names_and_callbacks) {

  if(names_and_callbacks[names_and_callbacks.length -1].name !== "cancel") {
    names_and_callbacks.push({
      name: "cancel",
      callback: function(){}
    });
  }

	var alert = Ti.UI.createAlertDialog({ 
		message: msg, 
		buttonNames: names_and_callbacks.map(function(obj){ return obj.name; }), 
		cancel:(names_and_callbacks.length-1)
	});

	alert.addEventListener('click', function(e) { 
    names_and_callbacks[e.index].callback();
	});
  
	alert.show();
	
	return alert;
};
