module.exports = function(options) {
    var loadingView = UI.createView({
          width:Ti.UI.SIZE,
          height: Ti.UI.SIZE,
          backgroundColor: '#333',
          borderRadius:10,
          opacity:0.8,
          visible:false,
          zIndex: 300
        }),

        activityView = UI.createView({
          width:Ti.UI.SIZE, 
          height:70,
          top:0
        }),

        activityIndicator = UI.createActivityIndicator({
          style: (isAndroid ? '' : Ti.UI.iPhone.ActivityIndicatorStyle.BIG),
          left:5,
          height:'auto',
          width:'auto'
        }),

        loadingLabel = UI.createLabel({
          left:45,
          height:'auto',
          width:'auto',
          font:{ fontSize:20, fontWeight:'bold' },
          color:"#fff",
          text: 'Loading '
        });

    activityView.add(activityIndicator);
    activityView.add(loadingLabel);
    loadingView.add(activityView);

    loadingView.showLoading = function(arg) {
        activityIndicator.show();
        if(!isAndroid) { loadingView.show();}
        return arg;
    };

    loadingView.hideLoading = function(arg) {
        activityIndicator.hide();
        if(!isAndroid) { loadingView.hide(); }
        return arg;
    };

  return loadingView;
};
