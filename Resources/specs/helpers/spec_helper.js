isIPad = false;
isIPhone = true;
isAndroid = false;
isMobileweb = true;

SpecHelper = {
  switchPlatform: function(platform, bool){
    if(platform == "Android") isAndroid = bool;
    if(platform == "IPhone") isIPhone = bool;
    if(platform == "IPad") isIPad = bool;
    if(platform == "Mobileweb") isMobileweb = bool;
  }
};

nrequire = function(path){
  path = __dirname.replace('specs/helpers', '')+path;
  return require(path);
}

Cloud = require('../../../modules/commonjs/ti.cloud/2.3.0/ti.cloud');

Cloud.Users.login = jasmine.createSpy().andCallFake(function(opts, cb){ cb({success:true})});
Cloud.KeyValues.get = jasmine.createSpy();

require('../mock_ti').mock();  
require('../../initializers/config');
require('../../initializers/init').init();
require('../factory_definitions');

Factory = function(name, props) {
	props = (props || {});
	var obj = FactoryDefinitions[name](props);
	obj.id = (obj.id || (Factory.id+=1));
	return obj;
}
Factory.id = 0;


expectThreaded = function(expectation, wait_time) {
	wait_time = (wait_time || 50);
	
	var fullExpectation = function() {
		expectation();
		asyncSpecDone();
	}

	setTimeout(fullExpectation, wait_time);
	asyncSpecWait();
}


sleep = function(millis) {
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < millis);
}

jasmineAuthenticateUser = function(user) {
  return function(cb, params) {
    if(params.username == 'test' && params.password == 'test') {
      cb({ data: user, status: "SUCCESS", msg: "" });
    } else {
      cb({status: "FAILURE", msg: "Wrong username and/or password"});
    }
  }
}

withTimeFrozenAt = function(time, fn){
  describe('with time frozen at ' + time, function() {
    var oldDate = Date;

    beforeEach( function() {
      Date = function() {
        return new oldDate(time);
      };
    });

    afterEach(function() {
      Date = oldDate;
    });

    fn();
  });
};

