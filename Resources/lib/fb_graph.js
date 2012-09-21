FbGraph = (function() {
	var _debug = 1;
	
	// from appcelerator fb stuff
	var _showRequestResult = defn(function(cb, e) {
	  log2("E", e);
		var s = '';
		if (e.success) {
			if (_debug){s = "SUCCESS";}
			if (e.result) {
				if (_debug) {s += "; " + e.result;}
				var reply = JSON.parse(e.result);
				var datum=reply.data || reply;
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
	
	function getNewsFeed(uid, cb) {
    _authenticated(function() {
			Ti.Facebook.requestWithGraphPath(uid+'/feed', {}, 'GET', _showRequestResult(cb));
    });
	}
	
	function getPage(uid, cb) {
		Ti.Facebook.requestWithGraphPath(uid+'/', {}, 'GET', _showRequestResult(cb));
	}
	
	function buildFQLPath(uid, query) {
	  return uid+"/fql?q="+query;
	}
	
	function manualRequest(url, fun) {
	  url = "https://graph.facebook.com/"+ url;
	  url = url + "&access_token=AAAEP95zi3bUBABZBI5H29tlvNTQZB8dEhWmUYpiZANGG5xEQcZBal3hgYBtsnKG9tlzaqZBRCZAucNdkg07mLwwZAJjih7umQlCmpD3PCXwSQZDZD";
  	var xhr = Ti.Network.createHTTPClient({});
  	xhr.onload = function() { fun(JSON.parse(this.responseText).data); };
    xhr.open("GET", url);
  	xhr.send();
  }
	
	function getEventsOlderThan2Weeks(uid, numeric_id, cb) {
	  function getEventsFromEids(data){
	    var eids = data.map(function(d){ return d.eid; }).join(",");
      var path = buildFQLPath(uid, "SELECT eid, name, pic_square, start_time, end_time, pic_big, description, location FROM event WHERE eid IN ("+eids+")");
			manualRequest(path, cb);
  	}
	  
    _authenticated(function() {
      var path = buildFQLPath(uid, "SELECT eid FROM event_member where uid="+numeric_id+" and start_time > 0");
      manualRequest(path, getEventsFromEids);
    });
	}
	
	function getEvents(uid, cb) {
    _authenticated(function() {
			Ti.Facebook.requestWithGraphPath(uid+'/events', {}, 'GET', _showRequestResult(cb));
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
	
	return {wallPost : wallPost,
	        getWallPosts: getWallPosts,
	        getNewsFeed: getNewsFeed,
	        getEvents: getEvents,
	        getEventsOlderThan2Weeks: getEventsOlderThan2Weeks,
	        getPage: getPage}
})();
