PullToRefresh = defn(function(beginLoading, tableView) {
  tableView.height = (51*20);
	tableView.zIndex = 1;
	
	var border = Ti.UI.createView({
      backgroundColor:"#576c89",
      height:2,
      bottom:0
  });

  var tableHeader = Ti.UI.createView({
      backgroundColor:"#e2e7ed",
      width:320,
      height:60
  });

  tableHeader.add(border);

  var arrow = Ti.UI.createView({
      backgroundImage:"tifu/images/blueArrow.png",
      width:23,
      height:60,
      bottom:10,
      left:20
  });

  var statusLabel = Ti.UI.createLabel({
      text:"Pull down to refresh...",
      left:55,
      width:200,
      bottom:30,
      height:"auto",
      color:"#576c89",
      textAlign:"center",
      font:{fontSize:13,fontWeight:"bold"},
      shadowColor:"#999",
      shadowOffset:{x:0,y:1}
  });

  var lastUpdatedLabel = Ti.UI.createLabel({
      text:"Last Updated: ",
      left:55,
      width:200,
      bottom:15,
      height:"auto",
      color:"#576c89",
      textAlign:"center",
      font:{fontSize:12},
      shadowColor:"#999",
      shadowOffset:{x:0,y:1}
  });

  tableHeader.add(arrow);
  tableHeader.add(statusLabel);
  tableHeader.add(lastUpdatedLabel);
  
  tableView.headerView = tableHeader;
	
	var wrapperView = Ti.UI.createView({});
  
  var scrollView = Ti.UI.createScrollView({
  	zIndex:2,
  	showVerticalScrollIndicator:false
  });
  
  scrollView.add(tableView);

  // update the offset value whenever scroll event occurs
  var offset = 0;
  scrollView.addEventListener('scroll', function(e) {
  	if (e.y!=null) {
  		offset = e.y;
  		Ti.API.debug('offset: '+offset);
  	}
  });

  // set the initial position of the scrollView's content
  var init = setInterval(function(e){
  	if (offset==50) {
  		Ti.API.debug('we have just done what the scrollView\'s contentOffset should be doing');
  		clearInterval(init);
  	}
  	scrollView.scrollTo(0,50);
  },100);
  
  var endLoading = function() {
    scrollView.scrollTo(0,50);
  }
  
  var bottomOfScreenOffset = ((51*20)-Ti.Platform.displayCaps.platformHeight);
  var lastRowOffset = bottomOfScreenOffset-50;
  Ti.API.debug("lastRowOffset: "+lastRowOffset+"\n bottomOfScreenOffset: "+bottomOfScreenOffset);
  scrollView.addEventListener('touchend', function() {
  	if (offset==0) {
  		Ti.API.info('REFRESH !!!!');
      beginLoading(function(rows) {
        tableView.setData(rows);
        endLoading();
        return rows;
      });
  	} else if (offset<50) {
  		endLoading();
  		Ti.API.info('Dont refresh, go back to base');
  	}
  });
  
  wrapperView.setData = function(rs) {
    tableView.setData(rs);
  }
  
  wrapperView.footerView = table_view.footerView
  
  wrapperView.add(scrollView);

  return wrapperView;
});