isIPhone = true;
isAndroid = false;
isMobileweb = true;

var oldRequire = require;
require = function(path){
  console.log('big fancy reequire', path);
  var ti_path = __dirname.match(/.*\/Resources/)[0];
  return oldRequire(ti_path+path);
}

require('/specs/mock_ti').mock();

// require('/initializers/init').init(require);
require('/specs/factory_definitions');

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