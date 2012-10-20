module.exports = (function() {
  var newsWin = nrequire('/windows/news'),
      aboutWin = nrequire('/windows/about'),
      eventsWin = nrequire('/windows/events'),
      photoGalleryWin = nrequire('/windows/photo_gallery'),
      Spinner = nrequire('/ui/spinner');
  
	var self = {
        tab_group: Ti.UI.createTabGroup({}),
      
        events: UI.createTab({
          title: 'Events',
          icon:'/images/icons/tab_cal.png',
          window: eventsWin().win
        }),

        news: UI.createTab({
          title: 'News',
          icon:'/images/icons/tab_newsfeed.png',
          window: newsWin().win
        }),
  
        photos: UI.createTab({
          title: 'Photos',
          icon:'/images/icons/tab_photo.png',
          window: photoGalleryWin().win
        }),
        
        about: UI.createTab({
          title: 'About Us',
          icon:'/images/icons/tab_about.png',
          window: aboutWin().win
        }),

        spinner: Spinner()
      };
	
	self.open = function() {
    Ti.App.addEventListener('show_activity', self.spinner.showLoading);
    Ti.App.addEventListener('hide_activity', self.spinner.hideLoading);
		self.tab_group.addTab(self.about);
		self.tab_group.addTab(self.events);
		self.tab_group.addTab(self.news);
		self.tab_group.addTab(self.photos);
		self.tab_group.add(self.spinner);
		self.tab_group.open();
	};

	return self;
})();
