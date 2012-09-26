var UI = require("/ui/proxies")
, EventsWindow = require("/windows/events")
// , NewsWindow = require("/windows/news")
, AboutWindow = require("/windows/about")
// , Spinner = require("/ui/spinner");

module.exports = (function() {

 var self = {
        tab_group: Ti.UI.createTabGroup({}),

        events: UI.createTab({
          title: 'Events',
          icon:'/images/icons/tab_cal.png',
          window: EventsWindow().win
        }),

        news: UI.createTab({
          title: 'News',
          icon:'/images/icons/tab_newsfeed.png',
          window: UI.createWindow()
        }),
  
        photos: UI.createTab({
          title: 'Photos',
          icon:'/images/icons/tab_photo.png',
          window: UI.createWindow()
        }),
        
        about: UI.createTab({
          title: 'About Us',
          icon:'/images/icons/tab_about.png',
          window: AboutWindow().win
        })
      };

 self.open = function() {
    // Ti.App.addEventListener('show_activity', self.spinner.showLoading);
    //     Ti.App.addEventListener('hide_activity', self.spinner.hideLoading);
   self.tab_group.addTab(self.events);
   self.tab_group.addTab(self.news);
   self.tab_group.addTab(self.photos);
   self.tab_group.addTab(self.about);
    // self.tab_group.add(self.spinner);
   self.tab_group.open();
 };

 return self;

})();

