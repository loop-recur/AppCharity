  var iPadWin = function() {
      var topBanner = nrequire('/templates/views/top_banner'),
          Controller = nrequire('/templates/controllers/events'),
          iPadController = nrequire('/templates/controllers/ipad/events'),
          SplitView = nrequire('/ui/split_view'),
          BorderShadows = nrequire('/ui/border_shadows');
      
                var self = {
                  win: UI.createWindow({
                    navBarHidden: true,
                    backgroundImage: '/images/backgrounds/main_bg.png',
                    backgroundRepeat: true
                  }),
                  
                  split_view: SplitView(),

                  donate_banner: topBanner.render().view,

                  shadow: BorderShadows({
                    top: 100
                  }).view,

                  table: UI.createTableView({
                    top: 100,
                    backgroundColor: "transparent",
                    separatorColor:'rgba(183,183,183,.5)'
                  })
                };

                self.win.add(self.shadow);
                
                self.split_view.open();
                self.win.add(self.split_view);
                
                self.win.add(self.donate_banner);
                self.split_view.detailView.add(self.shadow);
                self.split_view.masterView.add(self.table);

                iPadController(self);

                return self;
              };

  var Win = function() {
      var topBanner = nrequire('/templates/views/top_banner'),
          Controller = nrequire('/templates/controllers/events'),
          iPadController = nrequire('/templates/controllers/ipad/events'),
          SplitView = nrequire('/ui/split_view'),
          BorderShadows = nrequire('/ui/border_shadows');
      
            var self = {
              win: UI.createWindow({
                navBarHidden: true,
                backgroundImage: '/images/backgrounds/main_bg.png',
                backgroundRepeat: true
              }),

              donate_banner: topBanner.render().view,

              shadow: BorderShadows({
                top: 100
              }).view,

              table: UI.createTableView({
                top: 100,
                backgroundColor: 'transparent'
              })
            };

            self.table.separatorColor = isAndroid ? '#999' : 'rgba(183,183,183,.5)';
            self.win.add(self.donate_banner);
            self.win.add(self.shadow);
            self.win.add(self.table);
            
            Controller(self);

            return self;
          };

module.exports = {render: (isIPad ? iPadWin : Win)};

