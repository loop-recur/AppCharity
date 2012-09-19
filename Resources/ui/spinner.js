Spinner = function(options) {
    var loadingView = Ti.UI.createView({
          width:Ti.UI.SIZE,
          height: Ti.UI.SIZE,
          backgroundColor: '#333',
          borderRadius:10,
          opacity:0.8,
          visible:false,
          zIndex: 300
        }),

        activityView = Ti.UI.createView({
          width:Ti.UI.SIZE, 
          height:70,
          top:0
        }),

        activityIndicator = Titanium.UI.createActivityIndicator({
          style: (isIPhone ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : ''),
          left:5,
          height:'auto',
          width:'auto'
        }),

        loadingLabel = Ti.UI.createLabel({
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
        if(isIPhone) { loadingView.show();}
        return arg;
    };

    loadingView.hideLoading = function(arg) {
        activityIndicator.hide();
        if(isIPhone) { loadingView.hide(); }
        return arg;
    };

  return loadingView;
};
