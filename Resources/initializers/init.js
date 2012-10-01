App = {};
Config = {};
Controllers = {};
Models = {};
Views = {};
UI = {};
Windows = {IPad : {}};
Helpers = {};

var fancyRequire = function(path) {
      if(isAndroid) {
        return function(module_name) { Ti.include('../'+path+"/"+module_name+".js"); }
      } else {
        return function(module_name) { return require(path+"/"+module_name); }
      }
    },

    requireFrom = function(from, xs) {
      var from = from || "";
      xs.map(function(m){ require(from+m+"/"+m)(fancyRequire(from+m)); });
    },
   
    domain = function(from) {
      requireFrom(from, ['support', 'lib']);
    },

    application = function(from) {
      requireFrom(from, ['ui', 'controllers', 'views', 'windows']);
    };


init = function(from, testing) {
  if(testing) require('../specs/mock_ti').mock();  
  domain(from);
  application(from);
}
