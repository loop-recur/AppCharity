Windows.Application = (function() {
	var self = {
        tab_group: Ti.UI.createTabGroup({}),

        events: UI.createTab({
          title: 'Events',
          icon:'/images/nav_icons/home.png',
          window: Windows.Events().win
        }),

        news: UI.createTab({
          title: 'News',
          icon:'/images/nav_icons/stores.png',
          window: Windows.News().win
        }),
  
        photos: UI.createTab({
          title: 'Photos',
          icon:'/images/nav_icons/account.png',
          window: UI.createWindow()
        }),
        
        about: UI.createTab({
          title: 'About Us',
          icon:'/images/nav_icons/account.png',
          window: Windows.About().win
        }),

        spinner: Spinner()
      };
	
	self.open = function() {
	  Ti.App.addEventListener('show_activity', self.spinner.showLoading);
    Ti.App.addEventListener('hide_activity', self.spinner.hideLoading);
		self.tab_group.addTab(self.events);
		self.tab_group.addTab(self.news);
		self.tab_group.addTab(self.photos);
		self.tab_group.addTab(self.about);
		self.tab_group.add(self.spinner);
		self.tab_group.open();
	};

	return self;

})();

