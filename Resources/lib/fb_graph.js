// FB Graph calls that use a generic app's token to avoid the need to login.
module.exports = (function() {
	var access_token = "AAAEP95zi3bUBABZBI5H29tlvNTQZB8dEhWmUYpiZANGG5xEQcZBal3hgYBtsnKG9tlzaqZBRCZAucNdkg07mLwwZAJjih7umQlCmpD3PCXwSQZDZD";
			
	function buildFQLPath(uid, query) {
    return uid+"/fql?q="+query;
	}
	
  // makes the actual call and parses the json.
	function _makeRequest(url, fun) {
    Ti.App.fireEvent('show_activity');
    url = "https://graph.facebook.com/"+ url;
    url = url + "&access_token="+access_token;
    var xhr = Ti.Network.createHTTPClient({});
    xhr.setTimeout(20000);
    xhr.onload = function() {
      fun(JSON.parse(this.responseText));
      Ti.App.fireEvent('hide_activity');
    };

    xhr.onerror = function() {
      Ti.App.fireEvent('hide_activity');
      alert('Error on Facebook request.  Please try again.');
    };
    xhr.open("GET", url);
    xhr.send();
  }
	
  // Use FQL to pull events further than 2 weeks.
	function getEventsOlderThan2Weeks(uid, numeric_id, cb) {
    function getEventsFromEids(data){
      var eids = data.data.map(function(d){ return d.eid; }).join(",");
      var path = buildFQLPath(uid, "SELECT eid, name, pic_square, start_time, end_time, pic_big, description, location FROM event WHERE eid IN ("+eids+")");
      _makeRequest(path, function(r){ cb(r.data); });
    }

    var path = buildFQLPath(uid, "SELECT eid FROM event_member where uid="+numeric_id+" and start_time > 0");
    _makeRequest(path, getEventsFromEids);
	}
	
	function getEvents(uid, cb) {
    _makeRequest(uid+"/events", function(r){ cb(r.data); });
	}
	
	function getNewsFeed(uid, cb) {
    _makeRequest(uid+"/feed", function(r){ cb(r.data); });
	}
	
	function getPage(uid, cb) {
    _makeRequest(uid+"/", function(r){ cb(r); });
	}
	
	function wallPost(options, callback) {
		_authenticated(function() {
			Ti.Facebook.requestWithGraphPath('me/feed', options, 'POST', callback);
		});
	}
	
	function _authenticated(fun) {
    Ti.Facebook.loggedIn ? fun() : Ti.Facebook.authorize();
		Ti.Facebook.addEventListener('login', fun);
	}
	
	return {wallPost : wallPost,
          getNewsFeed: getNewsFeed,
          getEvents: getEvents,
          getEventsOlderThan2Weeks: getEventsOlderThan2Weeks,
          getPage: getPage};
})();
