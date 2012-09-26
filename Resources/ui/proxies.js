var UI = {}
, Scaler = require('/lib/scaler');

UI.createActivityIndicator = function(props){
	var ind = Ti.UI.createActivityIndicator(props);
	
	if(isIPhone) {
		return makeFirstClassAndComposable(ind, 'show', 'hide');
	} else {
		ind.show_ = id;
		ind.hide_ = id;
		return ind;
	}
}

UI.createAlertMessage = function(message) {
  alert(message);
}

UI.createButton = function(props) {
  return Ti.UI.createButton(Scaler(props));
};

UI.createButtonBar = function(props) {
	return Ti.UI.createButtonBar(Scaler(props));
};

UI.createImageView = function(props) {
	return Ti.UI.createImageView(Scaler(props));
}

UI.createLabel = function(props) {
	var lbl = Ti.UI.createLabel(Scaler(props));
	return makeScalerFun(lbl, 'animate');
}

UI.createPicker = function(props) {
	return FullPicker(Scaler(props));
}

UI.createMapView = function(props) {
	var mv = Ti.Map.createView(Scaler(props));
	mv.annotate = function(x) { mv.addAnnotation(x); return x; }
	mv.assignRegion = function(x) {
		mv.setLocation(x); return x;
	}
	return mv;
}

UI.createNavigationGroup = function(props) {
	var v = NavGroup(Scaler(props));
	return makeFirstClassAndComposable(v, 'open', 'close');
}

UI.createScrollView = function(props) {
	return Ti.UI.createScrollView(Scaler(props));
}

UI.createSearchBar = function(props) {
	return SearchBar(Scaler(props));
}

UI.createSwitch = function(props) {
	return Ti.UI.createSwitch(Scaler(props));
}

UI.createTab = function(props) {
	var tab = Ti.UI.createTab(props); // no need for scaler here
	return makeFirstClassAndComposable(tab, 'open');
}

UI.createTabbedBar = function(props) {
	props.labels = map(Scaler, props.labels);
	return TabbedBar(Scaler(props));
}

UI.createTableView = function(props) {
	var view = Ti.UI.createTableView(Scaler(props));
	view.set = function(d){
		view.setData(d);
		return d;
	}

  makeFirstClassAndComposable(view, 'appendRow', 'add');
	return view;
}

UI.createTableViewRow = function(props) {
	if(props['selectionStyle'] && props['selectsStyle'] == "NONE"){
		if(isIPhone){ props['selectionStyle'] = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;} 
	}
  var row = Ti.UI.createTableViewRow(Scaler(props));
  return makeFirstClassAndComposable(row, 'add');
}

UI.createTableViewSection = function(props) {
  return Ti.UI.createTableViewSection(Scaler(props));
}

UI.createTextField = function(props) {
  if(props.softKeyboardOnFocus) {
    props.softKeyboardOnFocus = (isAndroid ? Ti.UI.Android[props.softKeyboardOnFocus] : 0);
  }
	return Ti.UI.createTextField(Scaler(props));
}

UI.createToolbar = function(props) {
	return Toolbar(Scaler(props));
}

UI.createView = function(props) {	
	var view = Ti.UI.createView(Scaler(props));
	makeScalerFun(view, 'animate');
  return view;
}

UI.createWebView = function(props) {	
	return Ti.UI.createWebView(Scaler(props));
}

UI.createWindow = function(props) {
	var win = Ti.UI.createWindow(Scaler(props));
	makeScalerFun(win, 'animate');
	return win;
}

function addOnceListener(v) {
  v.addOnceEventListener_ = function(name, f) {
    var onceFunction = function() {
      f.apply(f, arguments)
      v.removeEventListener(name, onceFunction);
    }
    
    v.addEventListener(name, onceFunction);
  }
  return v;
}

function makeScalerFun(obj, name) {
  var old = function(x){ obj[name](x); }
	obj[name+'_'] = function(props) {
		return old(Scaler(props));
	}
	return obj;
}

var overWriteFun = function(obj, name) {
	var old = function(x){ obj[name](x); }
	obj[name+'_'] = function(x) {
		old(x);
		return x
	}
	return obj;
}

function makeFirstClassAndComposable(/* obj, names */) {
	var args = Array.prototype.slice.call(arguments), obj = args[0], names = args.slice(1,args.length);
	names.reduce(overWriteFun, obj);
	return obj;
}

module.exports = UI;