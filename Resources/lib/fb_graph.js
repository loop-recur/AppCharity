module.exports = (function() {
	var _debug = 1;
	var access_token = "AAAEP95zi3bUBABZBI5H29tlvNTQZB8dEhWmUYpiZANGG5xEQcZBal3hgYBtsnKG9tlzaqZBRCZAucNdkg07mLwwZAJjih7umQlCmpD3PCXwSQZDZD";
			
	function buildFQLPath(uid, query) {
	  return uid+"/fql?q="+query;
	}
	
	function manualRequest(url, fun) {
	  url = "https://graph.facebook.com/"+ url;
	  url = url + "&access_token="+access_token;
  	var xhr = Ti.Network.createHTTPClient({});
  	xhr.onload = function() { fun(JSON.parse(this.responseText)); };
    xhr.open("GET", url);
  	xhr.send();
  }
	
	function getEventsOlderThan2Weeks(uid, numeric_id, cb) {
	  function getEventsFromEids(data){
	    var eids = data.data.map(function(d){ return d.eid; }).join(",");
      var path = buildFQLPath(uid, "SELECT eid, name, pic_square, start_time, end_time, pic_big, description, location FROM event WHERE eid IN ("+eids+")");
			manualRequest(path, function(r){
			  cb(r.data);
			});
  	}
	  
    _authenticated(function() {
      var path = buildFQLPath(uid, "SELECT eid FROM event_member where uid="+numeric_id+" and start_time > 0");
      manualRequest(path, getEventsFromEids);
    });
	}
	
	function getEvents(uid, cb) {
	  manualRequest(uid+"/events", function(r){
	    cb(r.data);
	  });
	}
	
	function getNewsFeed(uid, cb) {
	  manualRequest(uid+"/feed", function(r){
	    cb(r.data);
	  });
	}
	
	function getPage(uid, cb) {
	  manualRequest(uid+"/", cb);
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
			fun();
		});
	}
	
	return {wallPost : wallPost,
	        getNewsFeed: getNewsFeed,
	        getEvents: getEvents,
	        getEventsOlderThan2Weeks: getEventsOlderThan2Weeks,
	        getPage: getPage}
})();
