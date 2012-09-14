alert = function(m) {
  log("alerting "+m);
}

console = {
  log: function() {throw("YOU CAN'T CONSOLE LOG ON A PHONE")}
}

stub = function(obj){
	if(obj) {
		return function(){ return obj };
	} else {
		return function(){};
	}
};

var Properties = (function() {
	var vals = {};
	
	var get = function(n) { return vals[n]; }
	var set = function(n,v) { vals[n] = v; }
	
	return {
		getInt: get,
		setInt: set,
		getString: get,
		setString: set
	};
})();

var EventRegistry = (function() {
	
	var register = function(obj, name, f) {
		obj[name+'event'] = f;
	}
	
	var fire = function(obj, name, e) {
		try { obj[name+'event'].apply(obj, flatten([(e || {})])); } catch(e){ }
	}
	
	return {register: register, fire: fire}
})();

var baseStubPrototype = function() {
	return {
		children: [],
		addEventListener: function(name, f){
			EventRegistry.register(this, name, f);
		},
		add: function(v){
			this.children.push(v);
		},
		remove: function(v) {
			this.children.splice(this.children.indexOf(v), 1);
		},
		fireEvent: function(name, e) {
			EventRegistry.fire(this, name, e)
		},
		animate: function(obj, cb) {
			for(p in obj) { this[p] = obj[p]; }
      if(cb) cb();
		}
	};
}

var Window = {
	open: function() {
		this.fireEvent('open')
	},
	close: function() {
	  this.fireEvent('close')
	}
}

var Map = {
  addAnnotation: function(v) {
    this.add(v);
    this.annotations = (this.annotations || []);
    this.annotations.push(v);
  },
  setLocation: function(region) {
    this.region = region;
  }
}

var PickerColumn = {
  addRow: function(x){
    this.add(x);
  }
}

var Picker = {
  add: function(rs) {
    this.data = rs;
    self = this;
		rs.map(function(r){ self.children.push(r); });
  },
  
  getSelectedRow: function(index) {
    return this.data[index];
  }
}

var Button = {
	clickevent: function(){
	  console.log('---------------disabled');
	}
}

var Image = {
	start: jasmine.createSpy('start'),
	stop: jasmine.createSpy('stop'),
	toBlob: stub({length: stub})
}

var Table = {
	setData: function(rs){
		self = this;
		rs.map(function(r){ self.add(r); });
		this.data = rs;
	}
}


var TableViewSection = {
  add: function(r) {
    this.data = this.data || [];
    this.data.push(r);
    this.children.push(r);
  },
  
  remove: function(r) {
    this.data = [];
    this.children = [];
  },
  
  rows: this.data
}

var BaseViewStub = function(kind) {
	return function(props) {
		var view = baseStubPrototype();
		for(p in props) view[p] = props[p];
		if(kind) for(m in kind) view[m] = kind[m];
		return view;
	}
}

var Geolocation = function() {
  return {
    locationServicesAuthorization: 0,
    AUTHORIZATION_DENIED: 1,
    AUTHORIZATION_RESTRICTED: 2,
    locationServicesEnabled: true,
    getCurrentPosition: function(cb){ cb({success: true, coords: {latitude: 123, longitude: 345}}) }
  }
}

module.exports.mock = function() {
	Titanium = {
		App: {
			Properties: Properties,
			addEventListener: function(name, f){
  			EventRegistry.register(this, name, f);
  		},
  		fireEvent: function(name, e) {
  			EventRegistry.fire(this, name, e)
  		}
		},
		Database: {open: stub({execute: stub, close: stub})},
		Geolocation: Geolocation(),
		Map: {createView: BaseViewStub(Map), createAnnotation: BaseViewStub()},
		Platform: {osname: 'iphone', displayCaps: {platformHeight: 480, platformWidth: 320}, openURL: stub},
		include: function(path) { require('../'+path.replace(/\.js$/, "")); },
		API: {info: function(i){ console.log(i); }},
		Media: {createSound:stub({play: stub})},
		Utils: {md5HexDigest: stub},
		UI: {
			create2DMatrix: stub({rotate: stub}),
			createWindow: BaseViewStub(Window),
			createView: BaseViewStub(),
			createButton: BaseViewStub(Button),
			createImageView: BaseViewStub(Image),
			createLabel: BaseViewStub(),
			createProgressBar: stub({show: stub, value:0}),
			createTextField: BaseViewStub({blur: stub, focus: stub}),
			createScrollView: BaseViewStub(),
			createSearchBar: BaseViewStub(),
			createSlider: stub,
			createPicker: BaseViewStub(Picker),
			createPickerRow: BaseViewStub(),
			createPickerColumn: BaseViewStub(PickerColumn),
			createTableView: BaseViewStub(Table),
			createTableViewRow: BaseViewStub(),
			createActivityIndicator: BaseViewStub({hide: stub, show: stub}),
			createTableViewSection: BaseViewStub(TableViewSection),
			iOS: {createToolbar: BaseViewStub()},
			iPhone: {
			  TableViewCellSelectionStyle : {},
			  TableViewStyle: {},
			  createNavigationGroup: BaseViewStub(Window),
			  AnimationStyle: {},
			  ActivityIndicatorStyle: {},
			  SystemButtonStyle: {},
			  SystemButton: {}
			},
			Android: {
			 SOFT_KEYBOARD_SHOW_ON_FOCUS: 0
			}
		}
	};
	
	Ti = Titanium;
}
