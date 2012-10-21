// A ton of wrapper classes of normal Ti.UI components.
// The main purpose is to abstract the scaling and
// extend styles if the property hash includes a style_id attribute.
// You can also use these wrappers to decorate appwide components with defaults attributes
// and extra methods.
var Scaler = nrequire('/lib/scaler'),
    Push = nrequire('/lib/push'),
    Style = nrequire('/ui/style'),
    merge = nrequire('/support/merge');

UI.createActivityIndicator = function(props){
	return Ti.UI.createActivityIndicator(Scaler(props));
};

UI.createAlertMessage = function(message) {
  alert(message);
};

UI.createButton = function(props) {
  props = extendStyle(props);
  return Ti.UI.createButton(Scaler(props));
};

UI.createImageView = function(props) {
  props = extendStyle(props);
	return Ti.UI.createImageView(Scaler(props));
};

UI.createLabel = function(props) {
  props = extendStyle(props);
	return Ti.UI.createLabel(Scaler(props));
};

UI.createScrollView = function(props) {
	return Ti.UI.createScrollView(Scaler(props));
};

UI.createTab = function(props) {
	return Ti.UI.createTab(props); // no need for scaler here
};

UI.createTableView = function(props) {
  return Ti.UI.createTableView(Scaler(props));
};

UI.createTableViewRow = function(props) {
	if(props['selectionStyle'] && props['selectsStyle'] == "NONE"){
		if(!isAndroid){ props['selectionStyle'] = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;} 
	}
  return Ti.UI.createTableViewRow(Scaler(props));
};

UI.createTextField = function(props) {
	return Ti.UI.createTextField(Scaler(props));
};

UI.createView = function(props) {	
  props = extendStyle(props);
	return Ti.UI.createView(Scaler(props));
};

UI.createWindow = function(props) {
	var win = Ti.UI.createWindow(Scaler(props));
	if(isAndroid) { Push.addAndroidSettingsEvent(win); }
	return win;
};

function extendStyle(props) {
  if(props.style_id && Style[Ti.Platform.osname] && Style[Ti.Platform.osname][props.style_id]) {
    props = merge(props, Style[Ti.Platform.osname][props.style_id]);
  } else if(props.style_id && Style[props.style_id]) {
    props = merge(props, Style[props.style_id]);
  }
  return props;
}
