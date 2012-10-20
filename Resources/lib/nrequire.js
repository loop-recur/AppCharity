// nrequire is a library that tries to pair the way android/iphone/node environments work
// Titanium's Android implementation does not allow any globals at all and we'd like to be
// able to use common.js just like any other environment.
// For this we use Ti.include on android and just assign the output to the last 
// value of module.exports.

// We use "real" common.js for everything but android. This leads to a quirk or
// two on android.

// 1. The result of nrequire() is whatever you last assigned module.exports to.
// 2. Other weirdness?

var isAndroid = Ti.Platform.osname == 'android';

if(isAndroid) exports = {}; // for libs like underscore
if(isAndroid) module = {};
var names = {};
nrequire = function(path) {
  if(isAndroid) {
    if(names[path]) { return names[path]; }
    Ti.include(path+'.js');
    names[path] = module.exports;
    return module.exports;
  } else {
    return require(path);
  }
};
