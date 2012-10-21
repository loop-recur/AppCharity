// nrequire is a library that tries to pair the way android/iphone/node environments work
// Titanium's Android implementation does not allow any globals at all and we'd like to be
// able to use common.js just like any other environment.
// For this we use Ti.include on android and just assign the output to the last 
// value of module.exports.

// We use "real" common.js for everything but android. This leads to a quirk or
// two:

// 1. The result of nrequire() is whatever you last assigned module.exports to so you can't do
// things like module.exports.myMethod = function(){}.  It has to be module.exports = {myMethod : myMethod}
// 2. It doesn't actually save you from globals!  So use var and good function scope practices.

if(Ti.Platform.osname == 'android') {
  exports = {}; // for libs like underscore
  module = {};
  var names = {};
  nrequire = function(path) {
    if(names[path]) { return names[path]; }
    Ti.include(path+'.js');
    names[path] = module.exports;
    return module.exports;
  }
} else {
  nrequire = require;
};
