module.exports = (function(global) {
  nrequire('/lib/jsOAuth-1.3.1');
  var K = function(){}, isAndroid = Ti.Platform.osname === "android";
  var global_config = {};
  
  /**
   * Twitter constructor function
   *
   *     var client = Twitter({
   *       consumerKey: "INSERT YOUR KEY HERE",
   *       consumerSecret: "INSERT YOUR SECRET HERE"      
   *     });
   *
   * Can be used with or without `new` keyword.
   *
   * @constructor
   * @requires jsOAuth: http://github.com/bytespider/jsOAuth
   * @param options {Object} Configuration object
   * @param options.consumerKey {String} Application consumer key
   * @param options.consumerSecret {String} Application consumer secret
   * @param options.accessTokenKey {String} (optional) The user's access token key
   * @param options.accessTokenSecret {String} (optional) The user's access token secret
   * @param [options.windowTitle="Twitter Authorization"] {String} (optional) The title to display in the authentication window
   */
  var Twitter = function(options) {
    var self;
    
    if (this instanceof Twitter) {
      self = this;
    } else {
      self = new K();
    }
    
    var accessTokenKey = Ti.App.Properties.getString('twitterAccessTokenKey'),
        accessTokenSecret = Ti.App.Properties.getString('twitterAccessTokenSecret');
           
    if (!options) { options = {}; }
    self.windowTitle = options.windowTitle || "Twitter Authorization";
    self.consumerKey = options.consumerKey;
    self.consumerSecret = options.consumerSecret;
    self.authorizeUrl = "https://api.twitter.com/oauth/authorize";
    self.accessTokenKey = options.accessTokenKey || accessTokenKey;
    self.accessTokenSecret = options.accessTokenSecret || accessTokenSecret;
    self.authorized = false;
    self.listeners = {};
    
    if (self.accessTokenKey && self.accessTokenSecret) {
      self.authorized = true;
    }
  
    options.requestTokenUrl = options.requestTokenUrl || "https://api.twitter.com/oauth/request_token";
    self.oauthClient = jsOAuth.OAuth(options);
    
    return self;
  };
  
  Twitter.setup = function(cfg) {
    global_config = cfg;
  }
  
  K.prototype = Twitter.prototype;
  
  function createAuthWindow() {
    var self = this,
        oauth = this.oauthClient,
        webViewWindow = Ti.UI.createWindow({title: this.windowTitle}),
        webView = Ti.UI.createWebView(),
        loadingOverlay = Ti.UI.createView({
          backgroundColor: 'black',
          opacity: 0.7,
          zIndex: 1
        }),
        actInd = Titanium.UI.createActivityIndicator({
          height: 50,
          width: 10,
          message: 'Loading...',
          color: 'white'
        }),
        closeButton = Ti.UI.createButton({
          title: "Close"
        }),
        backButton = Ti.UI.createButton({
          title: "Back"
        });
  
    this.webView = webView;
    
    webViewWindow.leftNavButton = closeButton;
    
    actInd.show();
    loadingOverlay.add(actInd);
    webViewWindow.add(loadingOverlay);
    webViewWindow.open({modal: true});
    
    webViewWindow.add(webView);
  
    closeButton.addEventListener('click', function(e) {
      webViewWindow.close();
      self.fireEvent('cancel', {
        success: false,
        error: "The user cancelled.",
        result: null
      });
    });
  
    backButton.addEventListener('click', function(e) {
      webView.goBack();
    });
    
    webView.addEventListener('beforeload', function(e) {
      if (!isAndroid) {
        webViewWindow.add(loadingOverlay);
        actInd.show();
      }
    });
  
    webView.addEventListener('load', function(event) {
      if(isAndroid) {
        actInd.hide();
        webViewWindow.remove(loadingOverlay);
      }
      
      // If we're not on the Twitter authorize page
      if (event.url.indexOf(self.authorizeUrl) === -1) {
        webViewWindow.remove(loadingOverlay);
        actInd.hide(); // Required for Android
        
        // Switch out close button for back button
        if (webViewWindow.leftNavButton !== backButton) {
          webViewWindow.leftNavButton = backButton;
        }
      } else {
        // Switch out back button for close button
        if (webViewWindow.leftNavButton !== closeButton) {
          webViewWindow.leftNavButton = closeButton;
        }
  
        // Grab the PIN code out of the DOM
        var pin = event.source.evalJS("document.getElementById('oauth_pin').getElementsByTagName('code')[0].innerText");
        
        if (!pin) {
          // We're here when:
          // - "No thanks" button clicked
          // - Bad username/password
  
          webViewWindow.remove(loadingOverlay);
          actInd.hide();
        } else {
          if (!isAndroid) { // on iOS we can close the modal window right away
            webViewWindow.close();
          }
          
          oauth.accessTokenUrl = "https://api.twitter.com/oauth/access_token?oauth_verifier=" + pin;
          
          oauth.fetchAccessToken(function(data) {
            var returnedParams = oauth.parseTokenRequest(data.text);
            self.fireEvent('login', {
              success: true,
              error: false,
              accessTokenKey: returnedParams.oauth_token,
              accessTokenSecret: returnedParams.oauth_token_secret
            });
            
            
            Ti.App.Properties.setString('twitterAccessTokenKey', returnedParams.oauth_token);
            Ti.App.Properties.setString('twitterAccessTokenSecret', returnedParams.oauth_token_secret);
            self.authorized = true;
            
            if (isAndroid) { // we have to wait until now to close the modal window on Android: http://developer.appcelerator.com/question/91261/android-probelm-with-httpclient
              webViewWindow.close();
            }
          }, function(data) {
            self.fireEvent('login', {
              success: false,
              error: "Failure to fetch access token, please try again.",
              result: data
            });
          });
        }
      }
    });
    
  }
  
  /*
   * Requests the user to authorize via Twitter through a modal WebView.
   */
  Twitter.prototype.authorize = function() {
    var self = this;
    
    if (this.authorized) {
      // TODO: verify access tokens are still valid?
      
      // We're putting this fireEvent call inside setTimeout to allow
      // a user to add an event listener below the call to authorize.
      // Not totally sure if the timeout should be greater than 1. It
      // seems to do the trick on iOS/Android.
      setTimeout(function() {
        self.fireEvent('login', {
          success: true,
          error: false,
          accessTokenKey: self.accessTokenKey,
          accessTokenSecret: self.accessTokenSecret
        });
      }, 1);
    } else {
      createAuthWindow.call(this);
  
      this.oauthClient.fetchRequestToken(
        function(requestParams) {
          var authorizeUrl = self.authorizeUrl + requestParams;
          self.webView.url = authorizeUrl;
        },
        function(data) {
          self.fireEvent('login', {
            success: false,
            error: "Failure to fetch access token, please try again.",
            result: data
          });
        }
      );
    }
  };
  
  /*
   * Get client timeline added by L/R
   * 
   * Returns instantiated twitter client for making calls with.
   */
  var _getClient = function() {
    var accessTokenKey = Ti.App.Properties.getString('twitterAccessTokenKey'),
           accessTokenSecret = Ti.App.Properties.getString('twitterAccessTokenSecret');
    
    return Twitter({consumerKey: global_config.consumerKey,
             consumerSecret: global_config.consumerSecret,
             accessTokenKey:accessTokenKey,
             accessTokenSecret:accessTokenSecret
            });
  }
  
  /*
   * Hacky timeline added by L/R since we didn't want it to be an auth request
   * 
   * @param {Object} screen_name, timeout, limit - all optional except screen_name
   * @param {Function} callback
   */
  Twitter.timeline = function(params, callback) {
    var limit = (params.limit || 15)
    , timeout = (params.timeout || 11000)
    , name = params.screen_name
    , url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name="+name+"&count="+limit;

    var request = function(url, fun) {
    	var xhr = Ti.Network.createHTTPClient({});
      xhr.timeout = timeout;
    	xhr.onload = fun;
      xhr.open("GET", url);
    	xhr.send();
    }

  	request(url, function(json){
  	  var tweets = eval('(' + this.responseText + ')'); // JSON.parse failed??
  	  callback(tweets);
  	});
  }
  
  /*
   * Favorite added by L/R.  Favorites a tweet.  Pass in tweet.id_str for it to work correctly.  Authorizes first
   * 
   * @param {String} Tweet id_str property to reply to
   * @param {String} Tweet so should be under 140 or whatever it is
   * @param {Function} get e.success passed to it to check if you succeeded or not.
   */
  Twitter.reply = function(id, status, cb) {
    _getClient().authRequest(function(){ this.request("1.1/statuses/update.json", {status: status, in_reply_to_status_id: id}, "POST", cb); }, cb);
  }
  
  /*
   * Favorite added by L/R.  Favorites a tweet.  Authorizes first
   * 
   * @param {String} Tweet id_str property of tweet to favorite
   * @param {Function} get e.success passed to it to check if you succeeded or not.
   */
  Twitter.favorite = function(id, cb) {
    _getClient().authRequest(function(){ this.request("1/favorites/create/"+id+".json", {id: id}, "POST", cb); }, cb);
  }

  /*
   * Retweet added by L/R.  Retweets. Authorizes first
   * 
   * @param {String} Tweet id_str property to retweet
   * @param {Function} get e.success passed to it to check if you succeeded or not.
   */
  Twitter.retweet = function(id, cb) {
    _getClient().authRequest(function(){ this.request("1/statuses/retweet/"+id+".json", {id: id}, "POST", cb); }, cb);
  }
  
  /*
   * Tweet added by L/R.  Does a status update with just the text.  Authorizes first
   * 
   * @param {String} Tweet so should be under 140 or whatever it is
   * @param {Function} get e.success passed to it to check if you succeeded or not.
   */
  Twitter.tweet = function(status, cb) {
    _getClient().authRequest(function(){ this.request("1.1/statuses/update.json", {status: status}, "POST", cb); }, cb);
  }
  
  /*
   * authRequest added by L/R.  Does a status update with just the text.  Authorizes first
   * 
   * @param {Function} Function to auth beforehand
   * @param {Function} call the original callback if it fails
   */
  Twitter.prototype.authRequest = function(requestFun, callback) {
    this.addEventListener('login', function(e) {
       if (e.success) {
         Ti.App.Properties.setString('twitterAccessTokenKey', e.accessTokenKey);
         Ti.App.Properties.setString('twitterAccessTokenSecret', e.accessTokenSecret);
        requestFun.call(this);
       } else {
         alert(e.error);
       }
     });
    this.authorize();
  }
  
  /*
   * Make an authenticated Twitter API request.
   * 
   * @param {String} path the Twitter API path without leading forward slash. For example: `1/statuses/home_timeline.json`
   * @param {Object} params  the parameters to send along with the API call
   * @param {String} [httpVerb="GET"] the HTTP verb to use
   * @param {Function} callback
   */
  Twitter.prototype.request = function(path, params, httpVerb, callback) {
    var self = this, oauth = this.oauthClient, url = "https://api.twitter.com/" + path;
    
    oauth.request({
      method: httpVerb,
      url: url,
      data: params,
      success: function(data) {
        callback.call(self, {
          success: true,
          error: false,
          result: data
        });
      },
      failure: function(data) { 
        callback.call(self, {
          url: url,
          params: params,
          success: false,
          error: "Request failed",
          result: data
        });
      }
    });
  };
  
  /*
   * Add an event listener
   */
  Twitter.prototype.addEventListener = function(eventName, callback) {
    this.listeners = this.listeners || {};
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(callback);
  };
  
  /*
   * Fire an event
   */
  Twitter.prototype.fireEvent = function(eventName, data) {
    var eventListeners = this.listeners[eventName] || [];
    for (var i = 0; i < eventListeners.length; i++) {
      eventListeners[i].call(this, data);
    }
  };
  
  return Twitter;
})(this);
