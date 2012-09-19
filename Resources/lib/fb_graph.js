FbGraph = (function() {
	var _debug = 1;
	
	// from appcelerator fb stuff
	var _showRequestResult = defn(function(cb, e) {
		var s = '';
		log(e);
		if (e.success) {
			if (_debug){s = "SUCCESS";}
			if (e.result) {
				if (_debug) {s += "; " + e.result;}
				var reply = JSON.parse(e.result);
				var datum=reply.data;
				if (_debug) { Ti.API.info(typeof reply.data); Ti.API.info(JSON.stringify(datum));}
				if(!datum) datum = [];
				cb(datum);
			}
			if (e.data) {
				if (_debug) {s += "; " + e.data;}
			}
			if (!e.result && !e.data) {
				s = '"success", but no data from FB.  I am guessing you cancelled the dialog.';
			}
		} else if (e.cancelled) {
			s = "CANCELLED";
			log("CANCELLED");
			cb([]);
		} else {
			s = "FAIL";
			if (e.error) {
				s += "; " + e.error;
			}
			cb([]);
		}
		//alert(s);
	});
	
	function getWallPosts(cb) {
		_authenticated(function() {
			Ti.Facebook.requestWithGraphPath('me/home', {}, 'GET', _showRequestResult(cb));
		});
	}
	
	function getNewsFeed(cb) {
    _authenticated(function() {
			Ti.Facebook.requestWithGraphPath('msf.english/feed', {}, 'GET', _showRequestResult(cb));
    });
	}
	
	function getEvents(cb) {
    _authenticated(function() {
			Ti.Facebook.requestWithGraphPath('msf.english/events', {}, 'GET', _showRequestResult(cb));
    });
	}

	function wallPost(options, callback) {
		_authenticated(function() {
			Ti.Facebook.requestWithGraphPath('me/feed', options, 'POST', callback);
		});
	}
	
	function _authenticated(fun) {
		Ti.Facebook.loggedIn ? fun() : Ti.Facebook.authorize();

		Ti.Facebook.addEventListener('login', function(e) {
		  Ti.API.info("LOGGED IN CALLBACK");
		  Ti.API.info(e);
		  log(e);
		  log(e.source);
			fun();
		});
	}
	
	return {wallPost : wallPost, getWallPosts: getWallPosts, getNewsFeed: getNewsFeed, getEvents: getEvents}
})();
